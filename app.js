const express = require('express'); 
const app = express();  
require('dotenv').config();
const puerto = process.env.PUERTO || 3000
//configursr para la lecturs del archivo
const sistemaArchivo = require("fs")
const ruta = require("path")
const rutaArchivoJson = ruta.join(__dirname, "datos.json")
//importar libreria para subir archivos
const multer =require("multer")
const jwt = require("jsonwebtoken")
//importacion de middleware personales
const registroMiddleware = require("./middleware/registroMiddleware")

const manejadorErrores = require("./middleware/manejadordeErrores")

const autenticarMiddleware = require("./middleware/autenticarMiddleware")

const {
    validarNombre,
    validarCorreo,
    validarDatos,
    generarId
} = require("./utilidades/validaciones");

//configurar almacenamiento
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "misImagenes/")
    },
    filename: (req, file, cb)=>{
        const extensionArchivo = ruta.extname(file.originalname);
        cb(null, `${Date.now()}${extensionArchivo}`)
    }
})

//niddelware creados
app.use((req, res, next)=>{
    console.log(`tiempo milisegundos: ${Date.now()}`)
    console.log(`fecha: ${new Date().toISOString()}`)
    next()
})

app.use(registroMiddleware)

const subirArchivo = multer({storage: almacenamiento})

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
app.post("/api/aprendices", subirArchivo.single("imagen"), (req, res) => {

    const nuevoAprendiz = req.body;

    // Validar que se hayan enviado datos
    if (!validarDatos(nuevoAprendiz)) {
        return res.status(400).json({
            error: "Debe enviar los datos del aprendiz"
        });
    }

    // Validar nombre
    if (!validarNombre(nuevoAprendiz.nombre)) {
        return res.status(400).json({
            error: "El nombre debe tener mínimo 3 letras"
        });
    }

    // Validar correo
    if (!validarCorreo(nuevoAprendiz.correo)) {
        return res.status(400).json({
            error: "El correo electrónico no es válido"
        });
    }

    // Generar ID automáticamente
    nuevoAprendiz.id = generarId();

    // Guardar la imagen
    nuevoAprendiz.imagen = req.file
        ? `/misImagenes/${req.file.filename}`
        : "Sin imagen";

    // Leer datos existentes
    sistemaArchivo.readFile(
        rutaArchivoJson,
        "utf-8",
        (error, datos) => {

            if (error) {
                return res.status(500).json({
                    error: "No se puede leer los datos"
                });
            }

            const listaAprendices = JSON.parse(datos);

            // Agregar aprendiz
            listaAprendices.push(nuevoAprendiz);

            // Guardar datos
            sistemaArchivo.writeFile(
                rutaArchivoJson,
                JSON.stringify(listaAprendices, null, 2),
                (error) => {

                    if (error) {
                        return res.status(500).json({
                            error: "No se puede registrar el aprendiz"
                        });
                    }

                    res.status(201).json({
                        mensaje: "Aprendiz creado con éxito",
                        aprendiz: nuevoAprendiz
                    });
                }
            );
        }
    );
});

//enpoint para modificat
app.put("/api/aprendices/:id", (req,res)=>{
    res.status(200).json({mensaje: "Endpoint en construccion de modificar."})
})
//enpoint para eliminar
app.delete("/api/aprendices/:id", (req,res)=>{
    res.status(200).json({mensaje: "Endpoint en construccion de eliminar."})
})

//provocar errores, utilizo next
app.get("/error", (req, res, next)=>{
    next(new Error("Error intencional para probar."))
})

//ruta protegida, necesita un token
app.get("/rutaprotegida", autenticarMiddleware, (req, res)=>{
    res.json({mensaje:"Esta ruta esta protegida."})
})

//endpoint iniciar sesion, generar tokend
app.post("/login",(req, res)=>{
    //capturar usuario, clave
    const {usuario, clave} = req.body
    //simular usuario de base de datos
    const usuarioBd = {"user": "Laura", "clave": "12hy4"}
    //verificar datos
    if(usuario !== usuarioBd.user || clave !== usuarioBd.clave){
        res.json({mensaje: "Credenciales incorrectas"})
    }
    //generar el token 
    const token = jwt.sign(
        {usuario: usuario},
        process.env.JWT_SECRETO,
        {expiresIn: "2h"}
        )
    res.json({token: token})
})


//uso del middleware de errorres
app.use(manejadorErrores)

app.listen(puerto, function () {
     console.log( `SERVIDOR http://localhost:${puerto}`) 
}); 