//const exoress = require("express")
import express from 'express';
//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()


const app = express();  
const port = process.env.PUERTO || 3030; 

app.get("/", (_, res) => {
    res.send("Aprendiendo express, con la ficha 3407181, ADSO en el SENA 31 de julio ")
})

//otro endpoint 
app.get("/otraruta", (req, res)=>{
    //usando template string
    res.send(`<h1>Otro ejemplo de ruta</h1>
        <h2>End point con res.send</h2>`)
})


app.get("/ruta2", (req, res)=>{
    res.json({"Nombre": "Laura", "Apellido": "Gutierrez", "Cargo": "Aprendiz"})
})

app.get("/ruta3/:aprendiz/:otrodato", (req, res)=>{
    const dato_aprendiz = req.params.aprendiz
    const otro_dato = req.params.otrodato
    res.json({"Nombre": dato_aprendiz, "Otro": otro_dato})
})


app.get("/ruta4", (req, res)=>{
    //capturar el parametro de consulta query
    const orden = req.query.orden || "sin ordenar"
    const pagina = req.query.pagina || 1
    res.send(`<h1>Listado Aprendices</h1>
        <p>El listado esta en orden ${orden}</p>
        <p>Pagina; ${pagina} </p>`)
})

app.listen(port, () => {
     console.log( `Servidor en funcionamiento en el puerto: ${port} http://localhost:3030`); 
}); 