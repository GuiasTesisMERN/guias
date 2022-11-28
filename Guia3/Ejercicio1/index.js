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
        const { nombres, apellidos, email, clave, fecha_nacimiento } = req.body;

        let rules = {
            nombres: 'required|max:50',
            apellidos: 'required|max:50',
            email: 'required|email',
            clave: 'required|alpha_num|min:8|confirmed',
            fecha_nacimiento: 'required|date'
        }

        let validation = new Validator(req.body, rules);

        if(validation.fails()) {
            throw new httpError('Error', 400, validation.errors.all())
        }

        res.status(200).json(
            {
                mensaje: "Datos enviados exitosamente",
                datos: req.body
            }
        );

    } catch (error) {
        if(error instanceof httpError) {
            res.status(error.status).json(
                {
                    mensaje: "Datos ingresados incorrectos",
                    error: true,
                    errores: error.response
                }
            );
        } else {
            res.status(500).json({
                mensaje: "Ocurrio un error",
                error: true,
                log: error.message
            });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
