class Localizador {
  constructor() {  }
  cargar(){
    navigator.geolocation.getCurrentPosition(this.mostrar, this.errores);
  }
  mostrar(posicion) {

    var mapurl = 'http://maps.google.com/maps/api/staticmap?center=' + posicion.coords.latitude + ',' + posicion.coords.longitude + '&zoom=12&size=400x400&sensor=false&markers='
      + posicion.coords.latitude + ',' + posicion.coords.longitude + '&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU';
    $("#ubicacion").after('<img alt="Mapa con ubicacion del usuario" src="' + mapurl + '">');
  }
  errores(error) {
    alert('Error: ' + error.code + ' ' + error.message);
  }
}
var localizador = new Localizador();