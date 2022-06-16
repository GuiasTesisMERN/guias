const http = require ('http');
const fs = require('fs');

const PORT = 8000;
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        const readStream = fs.createReadStream('./static/index.html');
        res.writeHead(200, {
            'Content-type': 'text/html',
        });
        readStream.pipe(res);
    } else if(req.url === '/json') {
        const readStream = fs.createReadStream('./static/ejemplo.json');
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        readStream.pipe(res);
    } else if(req.url === '/imagen') {
        const readStream = fs.createReadStream('./static/imagen.png');
        res.writeHead(200, {
            'Content-type': 'image/png',
        });
        readStream.pipe(res);
    } else {
        res.write('Pagina no encontrada')
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
