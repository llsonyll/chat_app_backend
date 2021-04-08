const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
  // Leer token
  const token = req.header('x-token');

  // si no existe el token
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No existe token en la peticion'
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.JWT_KEY);

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token invalido'
    });
  }
}

const comprobarJWT = (token = '') => {
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
}

module.exports = {
  validarJWT,
  comprobarJWT,
}