const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
    res.send("Hola Mundo!!");
});

app.get('/ejemplo', (req, res) => {
    res.send("Página de ejemplo");
});

app.get('/ejemplo/:nombre/:edad', (req, res) => {
    //Desestructuración de un objeto
    let { nombre, edad } = req.params;
    let { color } = req.query;
    console.log("Params: ",req.params);
    console.log("Query: ", req.query)
    res.send(`Hola soy ${nombre} y tengo ${edad} años. Color: ${color}`);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
