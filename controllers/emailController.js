// emailController.js

const transporter = require('../emailConfig'); // Importa el transportador configurado
const clienteController = require('./clienteController'); // Importa el controlador para obtener datos del cliente

// Función para enviar correo electrónico al cliente
const enviarCorreoCliente = async (idCliente) => {
    try {
        // Obtener datos del cliente
        const cliente = await clienteController.obtenerClientePorId(idCliente);

        // Configurar el contenido del correo
        const mailOptions = {
            from: 'tucorreo@gmail.com',
            to: cliente.correo_electronico,
            subject: 'Información Importante de tu Cuenta',
            text: `Hola ${cliente.nombre},\n\n` +
                  `Aquí tienes la información actualizada de tu cuenta:\n` +
                  `Nombre: ${cliente.nombre}\n` +
                  `Dirección: ${cliente.dirección}\n\n` +
                  `Gracias por ser nuestro cliente.\n\n` +
                  `Atentamente,\n` +
                  `Tu Empresa`
        };

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado correctamente.');
    } catch (err) {
        console.error('Error al enviar el correo electrónico:', err.message);
        throw err;
    }
};

module.exports = {
    enviarCorreoCliente
};
