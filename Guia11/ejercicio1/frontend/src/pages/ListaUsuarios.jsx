import React, { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { getAllUsers } from '../API/user';
import { UserContext } from './../Context/UserContext';

import SimpleTable from '../components/SimpleTable';
import { Typography } from '@mui/material';

const ListaUsuarios = () => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        getAllUsers(user?.token)
            .then((res) => {
                setData({...res.data});
            });
    }, [user]);

  return (
    <Box
      component={Paper}
      sx={{
        padding: '2.5rem'
      }}
    >
      <Typography variant='h5'>
        Sección de listado de usuarios
      </Typography>
      <SimpleTable datos={data.usuarios} cabeceras={["ID", "Nombres", "Apellidos", "Email"]} />
    </Box>
  )
}

export default ListaUsuarios