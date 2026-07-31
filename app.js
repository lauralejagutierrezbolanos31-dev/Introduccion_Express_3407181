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

app.listen(port, () => {
     console.log( `Servidor en funcionamiento en el puerto: ${port} http://localhost:3030`); 
}); 