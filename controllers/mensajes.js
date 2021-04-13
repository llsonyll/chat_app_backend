
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {
  //Id del usuario principal
  const miId = req.uid;
  //Id del usuario contacto - secundario
  const mensajesDe = req.params.de;
  //Ultimos 20 mensajes del chat PRIVADO
  const last20 = await Mensaje.find({
    $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }]
  }).sort({ createdAt: 'desc' }).limit(20);

  res.json({
    ok: true,
    miId,
    mensajesDe,
    mensajes: last20
  });
}

module.exports = {
  obtenerChat
}