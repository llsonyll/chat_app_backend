const { validationResult } = require("express-validator");

const validarRegistro = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    })
  } else {
    next();
  }
}

const validarLogin = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    })
  } else {
    next();
  }
}

module.exports = {
  validarRegistro,
  validarLogin,
}