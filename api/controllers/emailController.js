const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

let enviarEmail = async (req, res) => {
    const { nombre, correo, telefono, mensaje } = req.body;

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
    host: 'mail.diegodavidochoa.co',
    port: 465,
    auth: {
        user: 'webeao@diegodavidochoa.co',
        pass: 'Alanemiliano123*'
    },
    tls:{
        rejectUnauthorized: false
    }

});



const info = await transporter.sendMail({
from: "'Alert Planet'  <webeao@diegodavidochoa.co>",
to: ['edwalejo21@hotmail.com','andres_marin1992@hotmail.com'],
subject: 'Contaco Alert Planet',
html: contentHTML
});

console.log('Message sent:', info.messageId);
   
//res.redirect('/success.html');
res.json({
    ok: true,
    informacion: info.messageId
  

})
}



module.exports = {
    enviarEmail
}