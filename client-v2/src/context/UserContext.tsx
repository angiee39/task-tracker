import { createContext, useState, useContext, useEffect } from 'react';

// Create User Context
const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data from local storage on mount
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
