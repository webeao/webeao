const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let enviarEmailContacto = async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;

    console.log('BODY', req.body)

    let body = req.body;
    console.log(body);
    contentHTML = `
<h1>Informacion del usuario</h1>
<ul>
<li>Nombre:   ${nombre}</li>
<li>Correo:   ${correo}</li>
<li>Telefono: ${telefono}</li>
</ul>
<h3>Mensaje</h3>
<p>${mensaje}</p>
`;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'webeao@gmail.com',
        pass: 'alan123*'
    },
    tls:{
        rejectUnauthorized: false
    }

});



const info = await transporter.sendMail({
from: "'Webeao'  <webeao@gmail.com>",
to: ['edwalejo21@hotmail.com'],
subject: 'Contaco eaodeveloper',
html: contentHTML
},(err)=> console.log('error', err));

// console.log('Message sent:', info.messageId);
   
//res.redirect('/success.html');
res.json({
    ok: true,
    // informacion: info.messageId
    // informacion: info

})
}



module.exports = {
    enviarEmailContacto
}