function body_autor_valido(body){
    let valido = true;
    
    const {
        nombre_completo,
        nacionalidad,
        fecha_nacimiento,
        retrato
    } = body;

    //validar campos obligatorios
    if (!nombre_completo) {
        return false
    };

    //validar tipos de datos
    if (typeof nombre_completo !== 'string' || nombre_completo.trim() === ''){
        return false
    };
    if(nacionalidad && !Number.isInteger(Number(nacionalidad))){
        return false
        //falta comprobar que la nacionalidad exista :)
    };
    if (fecha_nacimiento && !Number.isInteger(Number(Date.parse(fecha_nacimiento)))){
        return false;
    };
    if (retrato && !es_url_valido(retrato)){
        return false;
    }

    return true;
}

module.exports = {body_autor_valido};