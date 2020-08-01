// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDZbc_E56PVvBD3Jig-PqPaP_-F7p686QU",
    authDomain: "claseiot-fb0e2.firebaseapp.com",
    databaseURL: "https://claseiot-fb0e2.firebaseio.com",
    projectId: "claseiot-fb0e2",
    storageBucket: "claseiot-fb0e2.appspot.com",
    messagingSenderId: "829581055678",
    appId: "1:829581055678:web:13c0fad7953904b9e070ef",
    measurementId: "G-FNCDKH281D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var ref = firebase.database().ref('/');

  ref.on("value", function(snapshot){
  	var data = snapshot.val();
  	document.getElementById("temperatura").innerHTML = data.temperatura;
  	document.getElementById("humedad").innerHTML = data.humedad;
  	document.getElementById("luz").innerHTML = data.luz;
      document.getElementById("gas").innerHTML = data.gas;
      
      if(data.EstadoLED == 1){
        document.getElementById("led").innerHTML = "Led encendido";
      }else{
        document.getElementById("led").innerHTML = "Led apagado";
      }
  
  });
  
  function encender() {
  	firebase.database().ref('/').child('EstadoLED').set("1");
	}

   function apagar() {
  	firebase.database().ref('/').child('EstadoLED').set("0");
   }
	
