import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Link, useLocation } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
    const { pathname } = useLocation();
    
    return (
        <Stack alignItems="center" direction="column" spacing={2}>
            <SentimentVeryDissatisfiedIcon sx={{ width: '200px', height: '200px' }} />
            <Typography variant="h3" component="h3">
                ERROR 404
            </Typography>
            <Typography variant="h5" component="h5">
                Página no encontrada.
            </Typography>
            <Typography>
                La ruta {pathname} no existe.
            </Typography>                
            <Typography variant='subtitle1' component={Link} to="/">
                Volver al inicio
            </Typography>
        </Stack>
    )
};

export default NotFound;