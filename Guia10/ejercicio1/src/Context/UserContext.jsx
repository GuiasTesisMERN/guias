import React, { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    //Extrae los valores que esta almacendados en el localStorage del navegador
    //para verificar si esta logeado o no
    const [user, setUser] = useLocalStorage('user', {email: '', auth: false});

    const login = (data) => {

        if(data.email === "") {
            return;
        }

        setUser({
            email: data.email,
            auth: true
        });
    }

    const logout = () => { 
        setUser({
            email: '',
            auth: false
        });
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
