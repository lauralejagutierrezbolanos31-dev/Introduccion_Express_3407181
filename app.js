//const exoress = require("express")
import express from 'express';
//leer el archivo .env
import {configDotenv} from "dotenv"
configDotenv()


const app = express();  
const port = process.env.PUERTO || 3030; 

//uso de middleware body-parse
app.use(express.json())

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

//enpoint para envio de datos formato JSON
app.post("/ruta2",(req, res)=>{
    const todosDatos = req.body
    const name = req.body.nombre
    const lastname = req.body.cargo
    res.status(201).json({Datos: todosDatos, nombre: name, cargo: lastname})

})


 app.post("/login", (req, res) => {

    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;

    if (!usuario || !contraseña) {
        return res.status(400).json({
            mensaje: "Faltan datos"
        });
    }

    if (usuario === "admin") {
        return res.status(200).json({
            mensaje: "Bienvenido administrador"
        });
    }

    if (usuario === "user") {
        return res.status(200).json({
            mensaje: "Bienvenido usuario"
        });
    }

    return res.status(403).json({
        mensaje: "Usuario no autorizado"
    });

});



app.listen(port, () => {
     console.log( `Servidor en funcionamiento en el puerto: ${port} http://localhost:3030`); 
}); 