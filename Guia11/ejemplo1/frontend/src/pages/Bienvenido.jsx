import React, { useState, useEffect, useContext } from 'react';

import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"

import { getProfile } from "./../API/user";
import { UserContext } from './../Context/UserContext';

const Bienvenido = () => {

    const {user, logout} = useContext(UserContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        if(user?.estado) {
            getProfile(user.id_usuario, user.token)
                .then((res) => {
                    setData({...res.data});
                })
                .catch((err) => {
                    if(err.request.status === 401) {
                        logout();
                    }
                });
        }
    }, [user, logout]);

    return (
        <>
            <Typography variant="h5">
                Bienvenido, {data?.datos.nombres} {data?.datos.apellidos}
            </Typography>
            <Button variant='contained' onClick={logout}>
                Cerrar sesion
            </Button>
        </>   
    )
};

export default Bienvenido;
