from flask import Blueprint, jsonify, request, url_for
import mysql.connector
import os

    # Create a Blueprint for product-related routes
products_route = Blueprint('products_list', __name__)
    # Database connection
def get_db_connection():
        return mysql.connector.connect(
            host='my-ecommerce-db.cd9fbewkdpr5.us-east-1.rds.amazonaws.com',
            user='admin',
            password="fK'&1spdg.lO7",  # Replace with your MySQL password
            database='ecommerce'  # Replace with your database name
        )
try:
    connection = get_db_connection()
    print("Database connection successful!")
except mysql.connector.Error as err:
    print("Error: Unable to connect to the database:", err)
    

    # Product Listing endpoint
@products_route.route('/products', methods=['GET'])
def get_products():
        connection = None
        cursor = None
        try:
            # Get query parameters
            category_id = request.args.get('category_id')  # Optional filter by category
            search_query = request.args.get('search_query')  # Optional filter by search term

            # Establish database connection
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)

            # Base query to fetch products
            query = '''
            SELECT p.product_id, p.name, p.description, p.price, p.stock_quantity, p.image_url, c.name AS category_name, c.description as category_description
            FROM products p
            JOIN categories c ON p.category_id = c.category_id
            WHERE 1 = 1
            '''
            params = []

            # Add filters to the query if parameters are provided
            if category_id:
                query += ' AND p.category_id = %s'
                params.append(category_id)
            if search_query:
                query += ' AND p.name LIKE %s'
                params.append(f"%{search_query}%")

            # Execute query
            cursor.execute(query, params)
            products = cursor.fetchall()

          

            # Return products as JSON
            return jsonify({'products': products, 'status': 'success'}), 200

        except Exception as e:
            print(f"Error: {str(e)}")
            return jsonify({"error": "An error occurred", "details": str(e)}), 500

        finally:
            if cursor:
                cursor.close()
            if connection and connection.is_connected():
                connection.close()
