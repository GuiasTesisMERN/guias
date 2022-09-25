import {useState} from "react";
import { useForm } from "react-hook-form";
import FormControl, { useFormControl } from '@mui/material/FormControl';

import MyTextInput from './components/MyTextInput';

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import TextField from '@mui/material/TextField';

const initialFormData = { nombres: "", apellidos: "", email: "", password: "", confirmPassword: ""};

function App() {

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  //const { control, handleSubmit, watch } = useForm();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const onSubmit = (e) => {
    e.preventDefault();

    let json = JSON.stringify(formData);
    console.log(json);
    //console.log(formData);
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  return (
    <Container sx={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
     }} component="main" maxWidth='xs'>
      <Paper sx={{ padding: "10px", display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        flexDirection: "column"
      }} 
      elevation={3}>
        <Avatar>
          <LockOutlinedIcon/>
        </Avatar>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <CajaTexto
                label="Nombres"
                name="nombres"
                half
                onChange={handleChange}
            />
            <CajaTexto
                label="Apellidos"
                name="apellidos"
                half
                onChange={handleChange}
            />
            <CajaTexto
                label="Email"
                name="email"
                onChange={handleChange}
                type="email"
            />
            <CajaTexto
                label="Contraseña"
                name="password"
                onChange={handleChange}
                type="password"
            />
          </Grid>
            
            <Button type="submit" 
              fullWidth variant="contained"
              color="primary"
              sx={{ marginTop: "10px" }}
            >
              Ok
            </Button>
        </form>
      </Paper>
      <button onClick={() => {console.log("click")}}>
        Click
      </button>
    </Container>
    
  )

/*
  return (
    <Container sx={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
     }} component="main" maxWidth='xs'>
      <Paper sx={{ padding: "10px", display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        flexDirection: "column"
      }} 
      elevation={3}>
        <Avatar>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography sx={{ margin: "10px 0px" }} variant="h5">Registrarse</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <MyTextInput
              name="nombres" label="Nombres" 
              autoFocus half 
              rules={{
                required: {
                  value: true,
                  message: "Se requieren los nombres"
                }
              }}
              control={control}
            />
            <MyTextInput
              name="apellidos" label="Apellidos" 
              half 
              rules={{
                required: {
                  value: true,
                  message: "Se requieren los apellidos"
                }
              }}
              control={control}
            />
            <MyTextInput
              name="email" label="Email"
              rules={{
                required: {
                  value: true,
                  message: "Se requieren el email"
                }
              }}
              control={control}
              type="email"
            />
            <MyTextInput
              name="password" label="Contraseña"
              half
              rules={{
                required: {
                  value: true,
                  message: "Se requiere una contraseña"
                },
                minLength: {
                  value: 6,
                  message: "La contraseña tiene menos de 6 cáracteres"
                }
              }}
              control={control} 
              type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}
            />
            <MyTextInput
              name="confirmPassword" label="Confirmar contraseña" 
              half
              rules={{
                required: {
                  value: true,
                  message: "Se requiere una contraseña"
                },
                validate: (value) => {
                  return value === watch("password") ? null : "Las contraseñas no coinciden"
                }
              }}
              control={control} 
              type="password"
            />
          </Grid>
          <Button type="submit" 
            fullWidth variant="contained"
            color="primary"
            sx={{ marginTop: "10px" }}
          >
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );*/
}

const CajaTexto = ({ name, label, half, type, onChange }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        label={label}
        name={name}
        type={type}
        onChange={onChange}
        fullWidth
      />
    </Grid>
  )
}

export default App;
