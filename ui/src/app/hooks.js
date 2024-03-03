import { createContext, useContext } from 'react';

const LocalStorageContext = createContext(null);


const setLocalStorageItem = (key, value) => {
    const now = new Date().getTime();
    const expirationTime = now + (24 * 60 * 60 * 1000); // 24 hours in milliseconds
    const item = {
        value: value,
        expirationTime: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(item));
};

const getLocalStorageItem = (key) => {
    return localStorage.getItem(key);
};

export const useLocalStorage = () => {
    return useContext(LocalStorageContext);
};

export const LocalStorageProvider = ({ children }) => {
    const functions = {
        setLocalStorageItem,
        getLocalStorageItem
    };

    return (
        <LocalStorageContext.Provider value={functions}>
            {children}
        </LocalStorageContext.Provider>
    );
};

