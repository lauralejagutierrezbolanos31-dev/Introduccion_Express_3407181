const express = require('express'); 
const app = express();  
require("dotenv/config")
const puerto = process.env.PUERTO || 3000
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")


app.get("/", (_, res) => {
    res.send("Hola aprendiendo express");
});

app.get("/api/aprendiz", (req, res)=>{
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        if(error){
            return res.json({Error:"no se puede leer los datos."})
        }
        const listaAprendices = JSON.parse(datos)
        res.json(listaAprendices)
    })
})

app.listen(puerto, function () {
     console.log( `SERVIDOR http://localhost:${puerto}`) 
}); 