const nodemailer = require('nodemailer');

// Configurar el transportador SMTP usando nodemailer (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alejovg1997@gmail.com',
        pass: 'Alejovg1997'
    }
});

module.exports = transporter;