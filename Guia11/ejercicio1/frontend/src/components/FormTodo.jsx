import React, {useState} from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import AddTaskIcon from "@mui/icons-material/AddTask";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import AlertMessage from '../components/AlertMessage';
import HoverRating from './HoverRating';
import { createNewTask } from '../API/task';

const FormTodo = ({todo, setTodo, token}) => {

    const initialState = {titulo: "", detalle: "", prioridad: 1};
    const [formData, setFormData] = useState(initialState);
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;

        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true);
        createNewTask(formData, token)
            .then((res) => {
                setFormData(initialState);
                setSuccess({...res.data});
                setTodo([
                    res.data.datos,
                    ...todo
                ])
                setError(null);
            })
            .catch((err) => {
                console.error(err)
                setError({...err});
                setSuccess(null);
            })
            .finally(() => {
                setLoading(false);
            })

        console.log(formData)
    }



  return (
    <Paper sx={{ width: '100%', maxWidth: 400, padding: "10px", bgcolor: 'background.paper' }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '10px 0px' }}>
            <Avatar sx={{ marginRight: "10px" }}>
                <AddTaskIcon/>
            </Avatar>
            <Typography variant='h5' component="h5">
                Crear nueva tarea
            </Typography>
        </Box>
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth required 
                        label="Titulo" value={formData.titulo} 
                        onChange={handleChange}
                        id="titulo" name="titulo" 
                        variant='outlined' 
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Detalle"
                        onChange={handleChange}
                        value={formData?.detalle}
                        id="detalle" name="detalle"
                        multiline rows={4}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <HoverRating 
                        name="prioridad"
                        value={formData.prioridad} 
                        onChange={handleChange}
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
                <Button 
                    fullWidth color='success' 
                    variant="contained" type="submit"
                    disabled={loading}
                    endIcon={<TaskAltIcon />}
                >
                    Guardar tarea
                </Button>
                </Grid>
            </Grid>
        </form>
    </Paper>
    
  )
}

export default FormTodo