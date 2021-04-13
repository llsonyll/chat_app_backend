const { io } = require('../index');
const { comprobarJWT } = require('../middlewares/validar-jwt');
const { UsuarioConectado, UsuarioDesconectado, guardarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    if (!valido) { return client.disconnect(); }

    // Cliente autenticado
    console.log('cliente autenticado');
    UsuarioConectado(uid);

    // Ingresar al usuario a una sala en particular...
    // Sala global | | client.id
    client.join(uid);

    client.on('mensaje-personal', async (payload) => {
        // console.log(payload);
        // de: '606b25baca2f4431d0341e75',
        // para: '606b25d4ca2f4431d0341e76',
        // mensaje: 'mensaje 1'
        await guardarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })

    client.on('disconnect', () => {
        UsuarioDesconectado(uid);
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });

});
