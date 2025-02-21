import React, { createContext, useContext, useState } from 'react';

// Create context to hold authentication state
const AuthContext = createContext();

// AuthProvider will wrap your app to provide the auth context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access authentication status
export const useAuth = () => useContext(AuthContext);
