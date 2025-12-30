import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            // Replace with your actual backend URL
            const response = await fetch('http://localhost:5000/api/auth/user', {
                method: 'POST',
                credentials: 'include', // Important: Sends cookies to backend
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
               
                setUser(result.data); // result.data usually contains the user object
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth check error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);