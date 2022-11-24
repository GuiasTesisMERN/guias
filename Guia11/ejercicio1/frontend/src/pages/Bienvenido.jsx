import React, { useState, useEffect, useContext } from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

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
        <Box
            component={Paper}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}
        >
            <Typography variant="h3">
                Bienvenido
            </Typography>
            <Divider
                sx={{
                    backgroundColor: 'black',
                    width: '95%'
                }}
            />
            <Typography variant="body1">
                {data?.datos.nombres} {data?.datos.apellidos}
            </Typography>
        </Box>   
    )
};

export default Bienvenido;
