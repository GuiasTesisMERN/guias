import React, { useState, createContext } from 'react';
import { axiosInstance } from '../API/axiosConfig';
import { userLogin } from '../API/user';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    //Extrae los valores que esta almacendados en el localStorage del navegador
    //para verificar si esta logeado o no
    const [user, setUser] = useLocalStorage('user', {email: '', estado: false});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (data) => {
        setLoading(true);
        
        const response = await userLogin(data)
        .then((res) => {
            setUser({...res.data});
            setError(null)
            return res;
        }).catch((err) => {
            setError({...err});
            return Promise.reject(err);
        }).finally(() => {
            setLoading(false);
        })
        
        return response;
    }

    const logout = () => { 
        setUser({
            estado: false
        });
    }

    return (
        <UserContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
