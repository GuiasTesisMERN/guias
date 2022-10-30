import React, { useState, useEffect } from 'react'

import Box from "@mui/material/Box"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip'

import { useParams } from 'react-router-dom';
import { listaTareas } from './../constants/index';
import { Link } from 'react-router-dom';

const Tareas = () => {

  const [data, setData] = useState(null)
  const [anterior, setAnterior] = useState(null);
  const [siguiente, setSiguiente] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    //Encontrar en el arreglo la tarea correspondiente al id
    const temp = listaTareas.filter((value) => value.id === parseInt(id))
    
    setData(...temp)
    
    if(data) {
      const prev = listaTareas.filter((value) => value.id === parseInt(id) - 1)
      const next = listaTareas.filter((value) => value.id === parseInt(id) + 1)

      setAnterior(...prev)
      setSiguiente(...next)
    }
    

  }, [id, data])

  if(!data) {
    return(
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
        <Typography variant='h5' color="text.secondary" sx={{ fontStyle: "italic" }} gutterBottom>
            No existe la tarea con el id {id}
        </Typography>
        <Typography component={Link} to={"/"}>
          Volver al inicio
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", }} >
      <Card sx={{ minWidth: 275, maxWidth: 370 }}>
      <CardContent>
        <Typography variant='h5' color="text.primary" gutterBottom>
          Tarea #{data?.id}
        </Typography>
        <Typography variant="h6" component="div">
          Finalizado: {data?.finalizada 
                        ? <Chip label="SI" color="success" size="small"/>
                        : <Chip label="NO" color="error" size="small"/>
                      }
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
        <Typography variant="body1">
          {data?.descripcion}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button 
          disabled={!(typeof anterior === "object")}
          LinkComponent={Link}
          to={`/tareas/${anterior?.id}`}
          variant='outlined'
          size="small">Anterior</Button>
        <Button
          disabled={!(typeof siguiente === "object")}
          LinkComponent={Link}
          to={`/tareas/${siguiente?.id}`}
          variant='outlined' 
          size="small">Siguiente</Button>
      </CardActions>
    </Card>
    </Box>
  )
}

export default Tareas