import React from 'react'

import { Link } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';

import TaskNotFinishIcon from '@mui/icons-material/CircleOutlined';
import TaskFinishIcon from '@mui/icons-material/TaskAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import DeleteIcon from '@mui/icons-material/Delete';

import { finalizarTask, deleteTask } from '../API/task';

const ListTodo = ({ data, setData, token }) => {

    if(!data) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    const onClickDelete = (id) => {
        deleteTask(id, token)
            .then((res) => {
                setData({...res.data.datos});
            });
    }

    const onClickFinalizar = (id) => {
        finalizarTask(id, token)
            .then((res) => {
                setData([...data, res.data.datos])
            });
    }

  return (
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List subheader={<ListSubheader inset>Lista de tareas</ListSubheader>}>
                {
                    data.length > 0 ? (
                        data?.map((v, k) => (
                            <ListItem key={k} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to={`/tareas/${v._id}`}
                                >
                                    <ListItemIcon>
                                        {
                                            v.finalizado ? (
                                                <TaskFinishIcon/>
                                            ) : (
                                                <TaskNotFinishIcon/>
                                            )
                                        }
                                    </ListItemIcon>
                                
                                    <ListItemText
                                        primary={v.titulo}
                                        sx={{
                                            textDecoration: v.finalizado ? 'line-through' : "none"
                                        }}
                                    />
                                </ListItemButton>
                                <Tooltip title={v.finalizado ? "Tarea finalizada" : "Finalizar tarea"}>
                                    <span>
                                        <IconButton color="success"
                                            onClick={(e) => {onClickFinalizar(v._id)}} 
                                            disabled={v.finalizado}
                                        >
                                            <TaskFinishIcon/>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                
                                <Tooltip title='Eliminar tarea'>
                                    <IconButton color="error" onClick={(e) => {onClickDelete(v._id)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <SentimentVeryDissatisfiedIcon/>
                                </ListItemIcon>
                                <ListItemText
                                    secondary={"No tiene ninguna tarea"}
                                />
                            </ListItemButton>
                        </ListItem>
                    )
                }
                {
                    !data ?? (<span>NO HAY</span>)
                }
            </List>
        </Paper>
        
        <Typography variant='subtitle2' component="span">
            Para ver detalles de click
        </Typography>
    </Box>
  )
}

export default ListTodo