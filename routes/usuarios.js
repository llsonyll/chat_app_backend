// Path => api/usuarios

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { ListarUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', validarJWT, ListarUsuarios);


module.exports = router;