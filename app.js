const express = require('express'); 
const app = express();  
require("dotenv/config")
const puerto = process.env.PUERTO || 3000
//configursr para la lecturs del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")

//enpoint raiz
app.get("/", (_, res) => {
    res.send("Hola aprendiendo express");
});

//enpoint para ver los datos del archivo
app.get("/api/aprendiz", (req, res)=>{
    //datos vienen del archivo
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        if(error){
            return res.json({Error:"no se puede leer los datos."})
        }
        const listaAprendices = JSON.parse(datos)
        res.json(listaAprendices)
    })
})

//endpoint para crear aprendices 
app.post("/api/aprendices", (req,res)=>{
    res.json({Mensaje: "Trabajando en el endpoint"})
})


app.listen(puerto, function () {
     console.log( `SERVIDOR http://localhost:${puerto}`) 
}); 