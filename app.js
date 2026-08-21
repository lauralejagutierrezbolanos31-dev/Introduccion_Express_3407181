const express = require('express'); 
const app = express();  
require("dotenv/config")
const puerto = process.env.PUERTO || 3000


app.get("/", (_, res) => {
    res.send("Hola aprendiendo express");
});

app.listen(puerto, function () {
     console.log( `SERVIDOR http://localhost:${puerto}`) 
}); 