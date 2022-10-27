import React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Typography } from '@mui/material';

const AlertMessage = ({mensaje, detalles, tipo}) => {

    let default_message = "Ha ocurrido un error";

  return (
    <Alert severity={tipo}>
        <AlertTitle>Aviso</AlertTitle>
        <Typography variant='subtitle1' component="span">{mensaje ?? default_message}</Typography>
        
        {
            typeof detalles === 'object' ? (
                <ul>
                    {
                        Object.values(detalles).map((detalle, key) => {
                            let el = detalle.map((d, k) => (
                                <li key={key + "_" + k}>{d}</li>
                            ));
                            return el;
                        })
                    }
                </ul>
            ) : null
        }
    </Alert>
  )
}

export default AlertMessage