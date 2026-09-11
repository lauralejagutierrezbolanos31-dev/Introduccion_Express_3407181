const express = require('express'); 
const app = express();  
require("dotenv/config")
const puerto = process.env.PUERTO || 3000
//configursr para la lecturs del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
//importar libreria para subir archivos
const multer =require("multer")

//middleware body-parse formatea lo datos enviados 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//enpoint raiz
app.get("/", (_, res) => {
    res.send("Hola aprendiendo express");
});

//enpoint para ver los datos del archivo
app.get("/api/aprendices", (req, res)=>{
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
app.post("/api/aprendices", (req, res)=>{
    const nuevoAprendiz = req.body
    //actualizacion la lectura del archivo
    sistemaArchivo.readFile(rutaArchivoJson, "utf-8", (error, datos)=>{
        if(error){
            return res.json({Error:"no se puede leer los datos."})
        }
        const listaAprendices = JSON.parse(datos)
        //agreagar el nuevo aprendiz
        listaAprendices.push(nuevoAprendiz)
        //escribir en el archivo
        sistemaArchivo.writeFile(rutaArchivoJson, JSON.stringify(listaAprendices, null,
        2), (error)=>{
            if (error){
                res.status(500).json({Error: "No se puede registrar el aprendiz"})
            }
            res.status(201).json({mensaje: "Aprendiz creado con exito"})
        })
    })
})


app.listen(puerto, function () {
     console.log( `SERVIDOR http://localhost:${puerto}`) 
}); 