"use strict";
class Tiempo {
    constructor(playas) {
        this.playas = playas;
    }
    cargar() {
        for (let playas of this.playas) {
            playas.cargarLink();
        }
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
class Playa {
    constructor(codigo, nombre) {
        this.apikey = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1bzI1MTMyMkB1bmlvdmkuZXMiLCJqdGkiOiJiZDFmNjliYy01OWQ3LTQ4YjUtODUzNS0wNDZlZTdhMTBiYzciLCJpc3MiOiJBRU1FVCIsImlhdCI6MTU0NDYyNTIzMSwidXNlcklkIjoiYmQxZjY5YmMtNTlkNy00OGI1LTg1MzUtMDQ2ZWU3YTEwYmM3Iiwicm9sZSI6IiJ9.2_F-eA93XR_ZWzg_C3H66ZY-2kTk1Q5fCTHevhPNTjI";
        this.nombre = nombre;
        this.codigo = codigo;
        this.url = "https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/" + this.codigo + "?api_key=" + this.apikey;
        this.error = "<h2>Error(No puedo obtener información de <a href='http://www.aemet.es'>AEMET</a>)</h2>";
        this.correcto = "Prediccion de " + nombre;

    }
    cargarLink() {
        var elem = this;
        $.ajax({
            async: true,
            crossDomain: true,
            dataType: "json",
            url: this.url,
            method: 'GET',
            headers: {
                "cache-control": "no-cache"
            },
            success: function (datos) {
                elem.cargarDatos(datos.datos);
            },
            error: function () {
                $("h3").html(this.error);
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
            }
        });
    }
    cargarDatos(link) {
        var elem = this;
        $.ajax({
            dataType: "json",
            url: link,
            method: 'GET',
            success: function (datos) {
                elem.json = JSON.stringify(datos, null, 2);

                var stringDatos = "<ul><li>Playa: " + datos[0].nombre + "</li>";

                stringDatos += "<li>Estado del cielo: " + datos[0].prediccion.dia[0].estadoCielo.descripcion1 + "</li>";
                stringDatos += "<li>Viento: " + datos[0].prediccion.dia[0].viento.descripcion1 + "</li>";
                stringDatos += "<li>Oleaje: " + datos[0].prediccion.dia[0].oleaje.descripcion1 + "</li>";
                stringDatos += "<li>Temperatura maxima: " + datos[0].prediccion.dia[0].tMaxima.valor1 + " grados Celsius</li>";
                stringDatos += "<li>Sensación térmica: " + datos[0].prediccion.dia[0].sTermica.descripcion1 + " grados Celsius</li>";
                stringDatos += "<li>Temperatura agua: " + datos[0].prediccion.dia[0].tAgua.valor1 + " grados Celsius</li>";
                stringDatos += "<li>Indice UV: " + datos[0].prediccion.dia[0].uvMax.valor1 + "</li>";


                elem.string = stringDatos;
                elem.verJSON();
            },
            error: function () {

            }
        });
    }
    crearArticulo(tituloH3, tituloH4, texto) {
        var arti = document.createElement("article");
        $("body").append(arti);
        var tiH3 = document.createElement("h2");
        tiH3.innerHTML = tituloH3;
        $(arti).append(tiH3);
        var tiH4 = document.createElement("h3");
        tiH4.innerHTML = tituloH4;
        $(arti).append(tiH4);
        var text = document.createElement("p");
        text.innerHTML = texto;
        $(arti).append(text);
    }
    verJSON() {
        //Muestra el archivo JSON recibido
        this.crearArticulo(this.correcto, "Datos", this.string);
    }
}

var playa1 = new Playa(3301608, "Salinas - San Juan, El Espartal");
var playa2 = new Playa(3301903, "La Isla");
var playa3 = new Playa(3302403, "San Lorenzo");
var playa4 = new Playa(3303407, "Primera y Segunda de Luarca");
var playa5 = new Playa(3303614, "Xiglu - Barro - Sorraos");
var playa6 = new Playa(3303902, "Aguilar");
var playa7 = new Playa(3304101, "Navia");
var playa8 = new Playa(3305602, "Santa Marina");
var playa9 = new Playa(3307606, "Rodiles");


var tiempo = new Tiempo([playa1, playa2, playa3, playa4, playa5, playa6, playa7, playa8,
    playa9]);