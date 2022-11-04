import React from 'react'

import { Link } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListSubheader from '@mui/material/ListSubheader';

import TaskNotFinishIcon from '@mui/icons-material/CircleOutlined';
import TaskFinishIcon from '@mui/icons-material/TaskAltOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const ListTodo = ({ data }) => {

    if(!data) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    console.log(data)

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