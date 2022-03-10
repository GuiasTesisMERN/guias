const http = require("http");

//Puerto donde se ejecutará el servidor
const PORT = 8000;

//Creando el servidor HTTP
const server = http.createServer((req, res) =>{
    //Req.url obtiene la ruta de la peticion
    if(req.url === '/') {
        res.write(`Hola mundo desde la ruta: "${req.url}"`);
    } else {
        res.write('Otra ruta');
    }
    res.end();
});

//Inicializar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});