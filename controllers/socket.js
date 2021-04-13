const Mensaje = require('../models/mensaje');
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

const guardarMensaje = async (payload) => {

  // Payload - > { de : '' , para : '', mensaje : ''}

  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  UsuarioConectado,
  UsuarioDesconectado,
  guardarMensaje
}