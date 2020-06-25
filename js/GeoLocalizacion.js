class Localizador {
  constructor() {  }
  cargar(){
    this.madrid = new google.maps.LatLng(
      40.416117,
      -3.704134
    );
    navigator.geolocation.getCurrentPosition(this.procesar, this.errores);
  }
  procesar(posicion) {

    var lat = posicion.coords.latitude;
    var long =  posicion.coords.longitude;
    localizador.posicionInicial = new google.maps.LatLng(
      lat,
      long
    );

    localizador.mostrar();
  }
  mostrar() {

    var mapaOpciones = {
      zoom: 15,
      center: this.marcadorInicial
    };
    var mapa = new google.maps.Map(
      document.getElementById("ubicacion"),
      mapaOpciones
    );

    
  }
  errores(error) {
    alert('Error: ' + error.code + ' ' + error.message);
  }
}
var localizador = new Localizador();