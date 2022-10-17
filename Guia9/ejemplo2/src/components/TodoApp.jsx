import React, { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField  from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoApp = () => {

    const [titulo, setTitulo] = useState("");
    const [todos, setTodos] = useState([]);
    const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
        if(titulo !== "") {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [titulo]);

    const handleChange = (e) => {
        const value = e.target.value;

        setTitulo(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(titulo === "") {
            return;
        }

        const newTodo = {
            id: crypto.randomUUID(),
            titulo: titulo
        };

        setTodos([
            ...todos,
            newTodo
        ]);

        setTitulo("");
    }

    const handleDelete = (id) => {
        const temp = todos.filter(item => item.id !== id);

        setTodos(temp);
    }

  return (
    <Container component="main" fixed>
        <Box sx={{ flexGrow: 1, padding: '10px' }} component={Paper} elevation={3}>
            <Grid component="form" onSubmit={handleSubmit} container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{ margin: "10px 0px" }} variant="h5">
                        ToDo List
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                        id="add-todo" label="Agregar ToDo" variant="outlined" 
                        onChange={handleChange} value={titulo} 
                        fullWidth autoComplete='false'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button    
                        sx={{ marginTop: "10px" }} variant="contained"
                        type="submit" disabled={disableButton}
                        fullWidth 
                    >
                        Agregar
                    </Button>
                </Grid>
            </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, padding: '10px', marginTop: '20px' }} component={Paper} elevation={3}>
            <Typography variant='h5' component='h5'>
                Lista
            </Typography>
            <List>
                {
                    todos.length !== 0 ? (
                        todos.map((value, key) => (
                            <ListItem
                                key={key}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete"
                                        onClick={(e) => {handleDelete(value.id)}}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                >
                                <ListItemText
                                    primary={value.titulo}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <span>No hay tareas</span>
                    )
                }
            </List>
        </Box>
    </Container>
  )
}

export default TodoApp;