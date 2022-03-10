const http = require ('http');
const fs = require('fs');

const PORT = 8000;
const server = http.createServer((req, res) => {
    let readStream = fs.createReadStream('./static/error404.html');
    let status = 404;
    if(req.url === '/') {
        status = 200;
        readStream = fs.createReadStream('./static/index.html');
    } else if(req.url === '/lista') {
        status = 200;
        readStream = fs.createReadStream('./static/lista.html');
    } else if(req.url === '/acerca_de') {
        status = 200;
        readStream = fs.createReadStream('./static/acerca.html');
    }
    res.writeHead(status, {
        'Content-type': 'text/html',
    });
    readStream.pipe(res);
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});