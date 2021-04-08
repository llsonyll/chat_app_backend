const { response } = require("express");
const Usuario = require('../models/usuario');

const ListarUsuarios = async (req, res = response) => {

  // parametro ? en la peticion
  const desde = Number(req.query.desde) || 0;


  const usuarios = await Usuario.find({
    // $ne => no existense
    _id: { $ne: req.uid }
  })
    .sort('-online')
    .skip(desde)
    .limit(10)

  res.json({
    ok: true,
    usuarios
  });
}

module.exports = {
  ListarUsuarios
}