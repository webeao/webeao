//configurar las variables de entorno para el puerto  
process.env.PORT = process.env.PORT || 3002;
process.env.API_URL = 'http://181.206.38.86:3002';

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//============================
//Base de datos
//============================
let  urlDB;

if(process.env.NODE_ENV === 'dev'){
    // urlDB ='mongodb://superAdmin:Alan123*@179.50.90.135:20723/alert-planet?authSource=admin'
 urlDB = 'mongodb://localhost:27017/webeao'
}else{
    urlDB = 'mongodb://localhost:27017/webeao'
}
process.env.URLDB =urlDB;

process.env.SEED = process.env.SEED || 'webeao';

process.env.CADUCIDAD_TOKEN = '48h';