const express = require('express');
const app = express();

app.use('/api',require('./usuarioRoutes'));
app.use('/api',require('./historiaRoutes'));
app.use('/api',require('./loginRoutes'));
app.use('/api',require('./emailRoutes'));
app.use('/api',require('./comentarioRoutes'));
app.use('/api',require('./categoriasRoutes'));
app.use('/api',require('./noticiasRoutes'));
app.use('/api',require('./consejosRoutes'));
app.use('/api',require('./calificacionRoutes'));
//app.use('/api',require('./uploadRoutes'));

module.exports = app;