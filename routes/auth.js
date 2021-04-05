// Path => api/login

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarRegistro, validarLogin } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'Contraseña formato incorrecto').not().isEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
  validarRegistro
], crearUsuario);

router.post('/', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'Contraseña formato incorrecto').not().isEmpty(),
  validarLogin
], loginUsuario);

router.get('/renew', validarJWT, renewToken);


module.exports = router;