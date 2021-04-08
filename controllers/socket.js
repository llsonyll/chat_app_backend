const Usuario = require('../models/usuario');

const UsuarioConectado = async (uid = '') => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;

  // Guardar en la base de datos
  await usuario.save();

  return usuario;
}

const UsuarioDesconectado = async (uid = '') => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;

  // Guardar en la base de datos
  await usuario.save();

  return usuario;
}

module.exports = {
  UsuarioConectado,
  UsuarioDesconectado
}