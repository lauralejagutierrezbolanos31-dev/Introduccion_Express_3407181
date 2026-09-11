const validarNombre = (nombre) => {
    return nombre &&
           typeof nombre === 'string' &&
           nombre.trim().length >= 3;
};

const validarCorreo = (correo) => {

    if (!correo || typeof correo !== 'string') {
        return false;
    }

    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresionRegular.test(correo);
};

const validarDatos = (datos) => {
    return datos && Object.keys(datos).length > 0;
};

const generarId = () => {
    return Date.now();
};

module.exports = {
    validarNombre,
    validarCorreo,
    validarDatos,
    generarId
};