import React, { useState, useEffect, useContext } from 'react';

import { getTasksByUser } from '../API/task';
import { UserContext } from './../Context/UserContext';

import ListTodo from './../components/ListTodo';
import FormTodo from './../components/FormTodo';

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const TodoList = () => {
    const { user, logout } = useContext(UserContext);
    const [data, setData] = useState(null);

    useEffect(() => {
      getTasksByUser(user?.token)
            .then((res) => {
                setData(res.data.datos);
            }).catch((err) => {
              if(err.response.status === 401) {
                logout()
              }
            });
    }, [user, logout]);

  
    const sxGlobal = {
      display: 'flex',
      justifyContent: 'center'
    }


  return (
    <>
      <Grid container spacing={2}
        component={Paper}
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          padding: '2.5rem'
        }}
      >
        <Grid item md={12} sx={{...sxGlobal}}>
          <Typography variant='h5'>
            Sección de tareas
          </Typography>
        </Grid>
        <Grid item md={6} xs={12} sx={{...sxGlobal}}>
          <FormTodo todo={data} setTodo={setData} token={user?.token} />
        </Grid>
        <Grid item md={6} xs={12} sx={{...sxGlobal}}>
          <ListTodo data={data} setData={setData} token={user?.token} />
        </Grid>
      </Grid>
    </>
  )
}
//sx={{ display: "flex", alignItems: "start", justifyContent: "space-between" }}
export default TodoList