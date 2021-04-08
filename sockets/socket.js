const { io } = require('../index');
const { comprobarJWT } = require('../middlewares/validar-jwt');
const { UsuarioConectado, UsuarioDesconectado } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    if (!valido) { return client.disconnect(); }

    //Cliente autenticado
    console.log('cliente autenticado');
    UsuarioConectado(uid);


    client.on('disconnect', () => {
        UsuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });

});
