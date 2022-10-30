import React, { useContext } from 'react';

import Typography from '@mui/material/Typography';

import { UserContext } from './../Context/UserContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Bienvenido = () => {

    const {user, logout} = useContext(UserContext);
    const tarea = new Array(4)

    return (
        <>
            <Typography variant="h5">
                Bienvenido
            </Typography>

            <div>
                {
                    tarea.map((v) => {
                        return (
                            <Button>
                                <Link to={`/tareas/${v + 1}`} />
                            </Button>
                        )
                    })
                }
            </div>
        </>
    )
};

export default Bienvenido;