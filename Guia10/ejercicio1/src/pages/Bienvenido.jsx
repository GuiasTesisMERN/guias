import React, { useState, useContext } from 'react';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { UserContext } from './../Context/UserContext';
import { Link } from 'react-router-dom';

import { listaTareas } from './../constants/index';

const Bienvenido = () => {

    const {user, logout} = useContext(UserContext);
    const [tarea, setTareas] = useState(listaTareas);

    console.log(tarea)

    return (
        <>
            <Typography variant="h5">
                Bienvenido
            </Typography>

            <div>
                {
                    tarea?.map((v, k) => {
                        return (
                            <Button
                                key={k}
                                LinkComponent={Link}
                                to={`/tareas/${v.id}`}
                                variant='outlined'
                            >
                                Tarea {v.id}
                            </Button>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Bienvenido;