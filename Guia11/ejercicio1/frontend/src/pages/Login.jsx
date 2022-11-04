import React, { useState, useContext } from 'react';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login"

import { UserContext } from './../Context/UserContext';
import AlertMessage from '../components/AlertMessage'

const Login = () => {
    const { login, loading, error } = useContext(UserContext);
    const [formData, setFormData] = useState({email: "", password: ""});

    const handleChange = (e) => {
        const value = e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        login(formData)
            .then((res) => {
                console.log("res",res);
            })
    }

    return (
        <>
            <Container
                component="section" maxWidth="sm"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column"
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px"
                }}>
                    <Avatar sx={{ bgcolor: "primary.main", marginRight: "10px" }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography variant='h5'>
                        Login
                    </Typography>
                </Box>
                <Grid component="form" onSubmit={handleSubmit} container spacing={3}>
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleChange}
                            id="email" name='email' type="email"
                            fullWidth required
                            label="E-mail" variant='outlined' 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            onChange={handleChange}
                            id="password" name='password' type="password"
                            fullWidth required
                            label="Contraseña" variant='outlined' 
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
                    <Grid item xs={12}>
                        <Button type='submit' color='primary' 
                            variant='contained' fullWidth
                            disabled={loading} 
                            startIcon={<LoginIcon />}
                        >
                            Iniciar sesión
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
};

export default Login;