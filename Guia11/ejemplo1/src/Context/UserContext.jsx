import React, { useState, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

import { userLogin } from "./../API/user";
import Modal from './../components/Modal';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    //Extrae los valores que esta almacendados en el localStorage del navegador
    //para verificar si esta logeado o no
    const [user, setUser] = useLocalStorage('user', {email: '', auth: false});
    
    const [error, setError] = useState({message: "", is: false});
    const [loading, setLoading] = useState(false);

    const login = (data) => {

        if(data.email === "") {
            return;
        }

        setLoading(true);
        userLogin(data)
            .then((res) => {
                setUser({
                    ...res.data,
                    email: data.email
                });
            })
            .catch((e) => {
                console.log(e)
                if(e.code === "ERR_BAD_REQUEST") {
                    setError({
                        message: e.response.data.mensaje,
                        is: true
                    })
                } else {
                    setError({message: "Ha ocurrido un error", is: true});  
                }
            }).finally(() => {
                setLoading(false);
            })
    }

    const logout = () => { 
        setUser({
            email: '',
            auth: false
        });
    }
console.log(user);
    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
            {
                error.is ? (
                    <Modal title={"Aviso"} message={error.message} 
                        error={error} setError={setError} 
                    />
                ) : (<></>)
            }
        </UserContext.Provider>
    );
}
