import React, { useState } from 'react';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoginIcon from "@mui/icons-material/Login";

import { Link } from 'react-router-dom';

import { createNewUser } from '../API/user';
import AlertMessage from '../components/AlertMessage';
import MyTextField from '../components/MyTextField';

const Registrarse = () => {

    const initialState = {nombres: "", apellidos: "", email: "", password: "", password_confirmation: ""};

    const [formData, setFormData] = useState(initialState);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {
        const value = e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true)
        createNewUser(formData)
            .then((res) => {
                setFormData({...initialState});
                setSuccess({...res.data});
                setError(null);
            })
            .catch((err) => {
                setError({...err});
                setSuccess(null);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <>
            <Container component={Paper} maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column",
                    padding: '2.5rem'
                }}>
                    <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px"
                }}>
                    <Avatar sx={{ bgcolor: "primary.main", marginRight: "10px" }}>
                        <GroupAddIcon/>
                    </Avatar>
                    <Typography variant='h5'>
                        Registrarse
                    </Typography>
                </Box>
                <Grid component="form" onSubmit={handleSubmit} container spacing={3}>
                    <MyTextField
                        half handleChange={handleChange}
                        name='nombres' type="text"
                        required value={formData.nombres}
                        label="Nombres"
                    />
                    <MyTextField
                        half handleChange={handleChange}
                        name='apellidos' type="text"
                        required value={formData.apellidos}
                        label="Apellidos"
                    />
                    <MyTextField
                        handleChange={handleChange}
                        name='email' type="email"
                        required value={formData.email}
                        label="E-mail"
                    />
                    <MyTextField
                        half handleChange={handleChange}
                        name='password' type="password"
                        required value={formData.password}
                        label="Contraseña"
                    />
                    <MyTextField
                        half handleChange={handleChange}
                        name='password_confirmation' type="password"
                        required value={formData.password_confirmation}
                        label="Confirmar Contraseña"
                    />
                    {
                        error ? (
                            <Grid item xs={12}>
                                <AlertMessage 
                                    mensaje={error.mensaje} 
                                    tipo="error"
                                    detalles={error.detalle}
                                />
                            </Grid>
                        ) : (null)
                    }
                    {
                        success ? (
                            <Grid item xs={12}>
                                <AlertMessage 
                                    mensaje={success.mensaje} 
                                    tipo="success"
                                    detalles={success.detalle}
                                />
                            </Grid>
                        ) : (null)
                    }
                    <Grid item xs={12}>
                        <Button type='submit' color='primary' 
                            variant='contained' fullWidth
                            disabled={loading} 
                            startIcon={<LoginIcon />}
                        >
                            Registrarse
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'
                            component={Link}
                            to={'/login'}
                            sx={{
                                textDecoration: 'none'
                            }}
                        >
                            ¿Ya tienes cuenta?, Inicia sesión aquí.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default Registrarse;