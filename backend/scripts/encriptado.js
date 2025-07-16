const bcrypt = require('bcrypt');

async function encriptar_clave(clave_plana){
    const medidor_sal = 10;
    const clave_hash = await bcrypt.hash(clave_plana, medidor_sal);
    return clave_hash;
}

module.exports = {encriptar_clave};