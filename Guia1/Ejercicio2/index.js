const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("Nombre del archivo: \n", (fileName) => {
    rl.question("Contenido del fichero: \n", (fileContent) => {
        fs.writeFile(fileName, fileContent, (err) => {
            if(!err) {
                console.log(`Archivo "${fileName}" creado.`);
            }
        });

        fs.readFile(fileContent, 'utf-8', (err, file) => {
            if(!err) {
                console.log(`Contenido del archivo: ${file}`)
            }
        });

        rl.close();
    });
});