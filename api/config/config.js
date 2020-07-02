//configurar las variables de entorno para el puerto  
process.env.PORT = process.env.PORT || 3001;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//============================
//Base de datos
//============================
let  urlDB;

if(process.env.NODE_ENV === 'dev'){
 urlDB = 'mongodb://localhost:27017/alert-planet'
}else{
    urlDB = 'mongodb+srv://alertplanet:Pofsk16Jrn2GQcFP@cluster0-ftth6.mongodb.net/test?retryWrites=true&w=majority'
}
process.env.URLDB =urlDB;

process.env.SEED = process.env.SEED || 'seguridad alert-planet';

process.env.CADUCIDAD_TOKEN = '48h';