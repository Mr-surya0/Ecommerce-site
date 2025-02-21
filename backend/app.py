from flask import Flask, jsonify, request, session
import mysql.connector
from flask_cors import CORS
import bcrypt  # Using bcrypt for password hashing
from product_list import products_route
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv('i.env')

# Get database credentials from .env file
db_password = os.getenv('DB_PASSWORD')
db_user = os.getenv('DB_USER')
db_host = os.getenv('DB_HOST')
db_name = os.getenv('DB_NAME')

print("DB User:", db_user)
print("DB Password:", db_password)
print("DB Host:", db_host)
print("DB Name:", db_name)

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')  # Use environment variable for secret key
CORS(app)
app.register_blueprint(products_route)

# Database connection
def get_db_connection():
    print(f"Connecting to database {db_name} as {db_user}...")
    return mysql.connector.connect(
        host=db_host,
        user=db_user,  # Use the user from .env
        password=db_password,  # Use the password from .env
        database=db_name  # Database name
    )

try:
    connection = get_db_connection()
    print("Database connection successful!")
except mysql.connector.Error as err:
    print("Error: Unable to connect to the database:", err)

# Function to hash password with bcrypt
def bcrypt_hash(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# Function to check password with bcrypt
def check_password(stored_hash, entered_password):
    return bcrypt.checkpw(entered_password.encode('utf-8'), stored_hash.encode('utf-8'))

# Sign-in endpoint
@app.route('/signin', methods=['POST'])
def signin():
    connection = None
    cursor = None
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({"error": "Invalid input"}), 400

        username = data['username']
        password = data['password']

        # Establish database connection
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Execute the select query
        query = 'SELECT user_id, email, password FROM users WHERE username = %s'
        cursor.execute(query, (username,))
        existing_user = cursor.fetchone()

        # Check if user exists
        if not existing_user:
            return jsonify({"message": "Invalid username or password"}), 401

        # Get stored password hash from the database
        stored_password_hash = existing_user['password']

        # Hash the entered password and compare it with the stored hash
        if check_password(stored_password_hash, password):
            session['user_id'] = existing_user['user_id']  # Set session with user_id
            return jsonify({
                'message': 'Sign-in successfully',
                'user_id': existing_user['user_id'],
                'email': existing_user['email'],
                'status': 'success'
            }), 200
        else:
            return jsonify({'message': 'Invalid username or password', 'status': 'error'}), 401

    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Sign-up endpoint
@app.route('/signup', methods=['POST'])
def signup():
    connection = None
    cursor = None
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data or 'username' not in data or 'password' not in data or 'email' not in data:
            return jsonify({"error": "Invalid input"}), 400

        username = data['username']
        email = data['email']
        password = data['password']

        # Establish database connection
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        # Check if username or email already exists
        check_query = 'SELECT * FROM Users WHERE username = %s OR email = %s'
        cursor.execute(check_query, (username, email))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"message": "Username or email already exists", "status": "error"}), 409

        # Hash the password (using bcrypt)
        hashed_password = bcrypt_hash(password)

        # Insert new user into the database
        insert_query = '''
        INSERT INTO Users (username, email, password, created_at)
        VALUES (%s, %s, %s, NOW())
        '''
        cursor.execute(insert_query, (username, email, hashed_password))
        connection.commit()

        return jsonify({"message": "User registered successfully", "status": "success"}), 201

    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()

# Run the app with Gunicorn (no need for app.run() here in production)
if __name__ == '__main__':
    app.run(debug=True)  
