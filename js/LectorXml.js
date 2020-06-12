class Lector {
  constructor() {}

  leerArchivo(files) {
    var archivo = files[0];
    var tipoXML = "text.xml";
    if (archivo.type.match(tipoXML)) {
      this.nombre = "Nombre del archivo: " + archivo.name;
      this.tamaño = "Tamaño del archivo: " + archivo.size + " bytes";
      this.tipo = "Tipo del archivo: " + archivo.type;
      this.modificacion =
        "Fecha de la última modificación: " + archivo.lastModifiedDate;

        var elem = this;
        var lector = new FileReader();
        lector.onload = function (evento) {
            elem.areaVisualizacion =  elem.leerXml(lector.result);
            elem.cargarSection();
        }
        lector.readAsText(archivo);


    } else {
      this.ocultarTexto();
      $("#error").show();
    }
  }
  ocultarTexto() {
    $("#error").hide();
    $("section").hide();
  }

  cargarSection() {
    this.ocultarTexto();
    $("section").show();

    $("#nombreArchivo").text(this.nombre);
    $("#tamañoArchivo").text(this.tamaño);
    $("#tipoArchivo").text(this.tipo);
    $("#ultimaModificacion").text(this.modificacion);
    $("#areaTexto").text(this.areaVisualizacion);
  }

  leerXml(xml) {

      var xmldoc = xml.responseXML;

      var stringDatos =  xmldoc.getElementsByTagName('personaje').item(0).getAttribute('nombre');
     
      return stringDatos;

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xml, "text/xml");

    var personajes = xmlDoc.getElementsByTagName("personaje");

    var texto = "Personajes: \n";

    for (let i = 0; i < personajes.length; i++) {
      texto += personajes[i].nodeValue;
      
    }

    return texto;
  }
}

var lector = new Lector();