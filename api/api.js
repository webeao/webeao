require('./config/config')

const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
var path = require('path');

// const cors = require('cors');





const app = express();

app.use(fileUpload());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, ");
    next();
});


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());



// app.use(cors());





app.use('/',express.static(path.join(__dirname, 'client')));
// app.use('/',express.static('client'));


// app.get('/', (req, res)=>{
//     res.send('Bienvenido al API de AlertPlanet')
// });


app.use(require('./routes/indexRoutes'));
app.get('*', function(req,res,next){
    res.sendFile(path.resolve('api/client/index.html'));
} )

mongoose.connect(process.env.URLDB,   
{useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true,useFindAndModify: false}
, (err, res) => {

    if(err){
        console.warn('la conexion ha fallado')
    }else{
        console.log('¡Base de datos online!')
    }

    
});

console.log(process.env);

app.listen(process.env.PORT, ()=>{
  console.log(`servidor corriendo en el puerto: ${process.env.PORT}`)
});


