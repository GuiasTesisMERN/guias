import React, { useState } from 'react';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LoginIcon from "@mui/icons-material/Login";

import { createNewUser } from '../API/user';
import AlertMessage from '../components/AlertMessage';

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
            <Container component="section" maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column"
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
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleChange}
                            id="nombres" name='nombres' 
                            type="text" fullWidth required
                            value={formData.nombres}
                            label="Nombres" variant='outlined' 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleChange}
                            id="apellidos" name='apellidos' 
                            type="text" fullWidth required
                            value={formData.apellidos}
                            label="Apellidos" variant='outlined' 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleChange}
                            id="email" name='email' type="email"
                            fullWidth required
                            value={formData.email}
                            label="E-mail" variant='outlined' 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleChange}
                            id="password" name='password' type="password"
                            fullWidth required
                            value={formData.password}
                            label="Contraseña" variant='outlined' 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            onChange={handleChange}
                            id="password_confirmation" name='password_confirmation' 
                            type="password" fullWidth required
                            value={formData.password_confirmation}
                            label="Confirmar Contraseña" variant='outlined' 
                        />
                    </Grid>
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
                </Grid>
            </Container>
        </>
    )
};

export default Registrarse;