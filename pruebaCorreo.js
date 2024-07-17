// pruebaCorreo.js

const emailController = require('./controllers/emailController');

// ID del cliente para enviar el correo electrónico de prueba
const idCliente = 400; // Ajusta según el cliente que desees probar

// Llama a la función para enviar el correo electrónico
emailController.enviarCorreoCliente(idCliente)
    .then(() => {
        console.log('Correo electrónico de prueba enviado correctamente.');
    })
    .catch((err) => {
        console.error('Error al enviar el correo electrónico de prueba:', err.message);
    });
