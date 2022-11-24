import React from 'react'

import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/es';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

import HoverRating from './HoverRating';
import { finalizarTask, deleteTask } from '../API/task';

const CardTodo = ({id, token, titulo, detalle, prioridad, user, finalizado, setFinalizado, fecha}) => {

    const navigate = useNavigate()

    let fechaBase = moment(fecha);
    let dia = fechaBase.format('D')
    let mes = fechaBase.format('MMM')
    let anyo = fechaBase.format('YYYY')

    let fechaFormateada = dia + ' de ' + mes + ' del ' + anyo
    let horaFormateada = moment(fecha).format('HH:mm:ss');

    const onClickFinalizar = (e) => {
        
        finalizarTask(id, token)
            .then((res) => {
                setFinalizado({...res.data.datos})
            });

    }

    const onClickDelete = (e) => {
        deleteTask(id, token)
            .then((res) => {
                navigate("/tareas")
            });
    }

    return (
        <Card sx={{ minWidth: 275, maxWidth: 400 }}>
          <CardContent>
            <Box sx={{ 
                display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between',
                flexDirection: 'row-reverse'
            }}>
                <Typography sx={{ fontSize: 12, marginLeft: '30px',textAlign: 'right' }} color="text.secondary" gutterBottom>
                    {fechaFormateada} 
                    <br/>
                    {horaFormateada}
                </Typography>
                <Typography sx={{ textTransform: 'uppercase' }} variant="h5" component="h5">
                    {titulo}
                </Typography>
            </Box>
            <Divider  />
            <Typography variant="body1">
              {
                detalle ? (
                    detalle
                ) : "---"
              }
            </Typography>
            <Typography variant="subtitle1">
              Prioridad:
            </Typography>
            <HoverRating
                readOnly
                value={prioridad}
            />
            <Typography sx={{ mt: 1.5, fontSize: 12 }} color="text.secondary">
                {user}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
                color='success'
                disabled={finalizado} 
                variant='contained' size="small" 
                startIcon={<DoneIcon/>}
                onClick={onClickFinalizar}
            >
                { finalizado ? 'Tarea finalizada' : 'Finalizar' }
            </Button>
            <Button 
                color='error' 
                variant='outlined' size="small" 
                startIcon={<DeleteIcon/>}
                onClick={onClickDelete}
            >
                Eliminar
            </Button>
          </CardActions>
        </Card>
      );
}

export default CardTodo