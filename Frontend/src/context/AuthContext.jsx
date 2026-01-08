import React, { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../services/apiClient'; // Import your new smart client

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            // We use apiClient.get instead of fetch.
            // It automatically handles the cookies and refresh logic.
            
            // NOTE: Assuming your route to get user details is GET /auth/user
            // If your backend route is different, update this URL.
            const response = await apiClient.get('/auth/user'); 
            
            if (response.data && response.data.data) {
                setUser(response.data.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            // It's normal to fail here if the user isn't logged in yet
            console.log("Not logged in"); 
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Run once on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Login function just updates state (The Login Page handles the API call)
    const login = (userData) => {
        setUser(userData);
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout');
            setUser(null);
            window.location.href = '/login';
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);