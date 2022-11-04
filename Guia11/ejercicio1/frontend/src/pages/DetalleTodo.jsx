import React, { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import CardTodo from './../components/CardTodo';

import { getTaskBy } from '../API/task';
import { UserContext } from './../Context/UserContext';

const DetalleTodo = () => {

    const {user, logout} = useContext(UserContext);

    const [data, setData] = useState(null);

    const {id} = useParams()

    useEffect(() => {
        getTaskBy(id, user?.token)
            .then((res) => {
                setData({...res.data.datos});
            })
            .catch((err) => {
                if(err.response.status === 401) {
                    logout()
                }
            })

    }, [id, user, logout]);

    if(!data) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

  return (
    <>
        {
            JSON.stringify(data) !== "{}" ? (
                <CardTodo
                    id={id}
                    titulo={data?.titulo}
                    detalle={data?.detalle}
                    prioridad={data?.prioridad}
                    finalizado={data?.finalizado}
                    fecha={data?.fecha_creacion}
                    user={data?.user?.nombres + " " + data?.user?.apellidos}
                    token={user?.token}
                    setFinalizado={setData}
                />
            ) : (
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant='subtitle2' component="span" >
                        La tarea que intenta buscar no existe
                    </Typography>
                </Box>
            )
        }
    </>
  )
}

export default DetalleTodo