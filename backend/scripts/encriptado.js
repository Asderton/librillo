const bcrypt = require('bcrypt');

async function encriptar_clave(clave_plana){
    const medidor_sal = 10;
    const clave_hash = await bcrypt.hash(clave_plana, medidor_sal);
    return clave_hash;
}

async function comparar_claves(clave_plana, clave_hash){
    const match = await bcrypt.compare(clave_plana, clave_hash);
    return match;
}

module.exports = {encriptar_clave, comparar_claves};