const express = require('express');
const httpError = require('express-exception-handler').exception;
const Validator = require('validatorjs');
//Mostrar mensajes en español
Validator.useLang('es');
const path = require('path');

const app = express();
const PORT = 8000;

//Middleware para obtener el body en las peticiones
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'index.html'))
});

//Petición POST
app.post("/", (req, res) => {
    try {
        const { email, clave } = req.body;

        let rules = {
            email: 'required|email',
            clave: 'required|min:8'
        }

        //Instacia del método Validator
        let validation = new Validator(req.body, rules);

        //Verificar si hay fallos en los datos
        if(validation.fails()) {
            //Lanzamos una excepción con un error 400 = Bad Request
            throw new httpError('Error', 400, validation.errors)
        }

        //Mandamos el codigo 200 = OK y un json 
        //que contiene los datos que mandamos y un mensaje
        res.status(200).json(
            {
                mensaje: "Datos correctos",
                datos: req.body
            }
        );

    } catch (error) {
        if(error instanceof httpError) {
            res.status(error.status).json(error.response);
        } else {
            res.status(500).json({
                mensaje: "Ocurrio un error",
                log: error.message
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
