const express = require('express');
//La variable app hace referencia a aplicacion
const app = express();
const PORT = 8000;

//Solicitudes GET a la URL raíz "/"
app.get('/', (req, res) => {
		//Envia la respuesta solicitada (text/plain)
    res.send("Hola Mundo!!");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
