import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null); // Add this line

    const login = (userId, role, token) => { // Modify the login function to include token
        setUserId(userId);
        setRole(role);
        setToken(token);
        // Store the token in localStorage or sessionStorage if needed
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUserId(null);
        setRole(null);
        setToken(null);
        // Remove the token from localStorage or sessionStorage if needed
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ userId, role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
