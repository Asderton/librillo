function validar_crear_pais(nombre_pais) {
    if (nombre_pais === undefined){
        return {status: 400, error: "Campos obligatorios faltantes!"};
    }
    if (typeof nombre_pais !== 'string'){
        return {status: 400, error: "Formato de nombre de pais invalido. Debe ser un string"};
    }
    if (nombre_pais.trim() === ''){
                return {status: 400, error: "El nombre del pais no puede estar vacio!"};
    }
    return true;
};

module.exports = { validar_crear_pais };