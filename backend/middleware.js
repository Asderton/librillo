const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');

const secreto = "Camejo la mejor catedra";
const algoritmo = 'HS256';

const middleware_jwt = expressjwt({
    secret: secreto,
    algorithms: [algoritmo]
});

function firmar_objeto(objeto) {
    return jwt.sign(objeto, secreto, { algorithm: algoritmo });
}

function middleware_error(err, req, res, next) {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({ message: "Debe iniciar sesion!"});
      return;
    }

    next();
}


module.exports = { middleware_jwt, firmar_objeto, middleware_error };