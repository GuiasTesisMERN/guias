import React, { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button"

import { UserContext } from './../Context/UserContext';

const Bienvenido = () => {

    const {user, logout} = useContext(UserContext);

    return (
        <>
            <Typography variant="h5">
                Bienvenido
            </Typography>
            <Typography>
                {user.email}
            </Typography>
            <Button variant='contained' onClick={logout}>
                Cerrar sesion
            </Button>
        </>   
    )
};

export default Bienvenido;