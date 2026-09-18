const jwt = require("jsonwebtoken")
//funcion para generar el token 
const autenticarMiddleware = (req, res, next)=>{
    //capturar el token enviado por el usuario
    const token = req.header("autenticar")?.split(" ")[1]
    if(!token){
        res.status(400).json({mensaje:"Acceso denegado no proporciona token"})
    }
    //verificar
    jwt.verify(token, process.env.JWT_SECRETO,(error,usuario)=>{
        if(error){
            res.status(403).json({mensaje:"Token invalido."})
        }
        req.usuario = usuario
    })
}

module.exports = autenticarMiddleware