const fs = require('fs');

let nombreArchivo = 'archivo.txt';

//Crear un archivo
fs.writeFile(nombreArchivo, "Esto es un ejemplo", (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Archivo creado exitosamente")
    }
});

//Leer el archivo
//UTF8 es el formato de codificacion para el archivo
fs.readFile(nombreArchivo, 'utf8',(err, file) => {
    if(err) {
        console.log(err);
    } else {
        console.log(file);
    }
});

//Eliminar un archivo
fs.unlink(nombreArchivo, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Archivo eliminado con exito.");
    }
});