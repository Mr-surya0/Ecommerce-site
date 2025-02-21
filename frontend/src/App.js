import './App.css';
import Home from './home.js';
import { Route, Routes ,Navigate} from 'react-router-dom';
import MainMenu from './mainMenu.js';
import Cart from './cart.js';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  
  return (
    <AuthProvider>

    <Routes>
      <Route path='/' element={<Home />} />
      <Route
          path="/mainMenu"
          element={<MainMenu />}
        />
      <Route path='/cart' element={<Cart />} />
    </Routes>
    </AuthProvider>

  );
}



const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the MainMenu component
  return <MainMenu />;
};

export default App;
