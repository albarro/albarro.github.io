class Lector {
  constructor() {}

  cargarDatos() {
    var elem = this;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            elem.leerXml(this)
            elem.cargarSection();
        } else {
          elem.ocultarTexto();
          $("#error").show();
      }
    };

    xhttp.open("GET", "https://albarro.github.io/Biblioteca.xml", true);
    xhttp.send();
}

  ocultarTexto() {
    $("#error").hide();
    $("section").hide();
  }

  cargarSection() {
    this.ocultarTexto();
    $("section").show();

    $("#areaTexto").text(this.areaVisualizacion);
  }

  leerXml(xml) {

    var xmldoc = xml.responseXML;


    var personajes = xmldoc.getElementsByTagName('personaje');

    var texto = "Personajes: \n";

    for (let i = 0; i < personajes.length; i++) {

      var personaje = personajes.item(i);

      var nombre = personaje.getAttribute('nombre');
      var raza = personaje.getElementsByTagName('raza').item(0).firstChild.data;
      var descripcion = personaje.getElementsByTagName('descripcion').item(0).firstChild.data;
      var transfondo = personaje.getElementsByTagName('transfondo').item(0).firstChild.data;
      var alinemiento =personaje.getElementsByTagName('alinemiento').item(0).firstChild.data;

      var imagen = personaje.getElementsByTagName('imagen').item(0).firstChild.data;

      var vida = personaje.getElementsByTagName('vida').item(0).firstChild.data;
      var movimiento = personaje.getElementsByTagName('movimiento').item(0).firstChild.data;

      var nivel = personaje.getElementsByTagName('nivel').item(0).firstChild.data;
      var clase = personaje.getElementsByTagName('clase').item(0).firstChild.data;
      var experiencia = personaje.getElementsByTagName('experiencia').item(0).firstChild.data;
      var movimiento = personaje.getElementsByTagName('movimiento').item(0).firstChild.data;


      var atributos = personaje.getElementsByTagName('atributos').item(0);

      var fuerza = atributos.getElementsByTagName('fuerza').item(0).firstChild.data;
      var destreza = atributos.getElementsByTagName('destreza').item(0).firstChild.data;
      var constitucion = atributos.getElementsByTagName('constitucion').item(0).firstChild.data;
      var inteligencia = atributos.getElementsByTagName('inteligencia').item(0).firstChild.data;
      var sabiduria = atributos.getElementsByTagName('sabiduria').item(0).firstChild.data;
      var carisma = atributos.getElementsByTagName('carisma').item(0).firstChild.data;

      atributos = new Atributos(fuerza,destreza,constitucion,inteligencia,sabiduria,
        carisma)


      var competencias = personaje.getElementsByTagName('competencias').item(0);

      var bonificador = competencias.getElementsByTagName('bonificador').item(0).firstChild.data;
      var atris = competencias.getElementsByTagName('salvaciones').item(0).getElementsByTagName('atributo');
      var salvaciones = [];
      for (let i = 0; i < atris.length; i++) {
        salvaciones.push(atris.item(i).firstChild.data);
      }
      var habils = competencias.getElementsByTagName('habilidades').item(0).getElementsByTagName('habilidade');
      var habilidades = [];
      for (let i = 0; i < habils.length; i++) {
        habilidades.push(habils.item(i).firstChild.data);
      }
      var ids = competencias.getElementsByTagName('idiomas').item(0).getElementsByTagName('idioma');
      var idiomas = [];
      for (let i = 0; i < ids.length; i++) {
        idiomas.push(ids.item(i).firstChild.data);
      }

      competencias = new Competencias(bonificador,salvaciones,habilidades,idiomas);

      var inventario = personaje.getElementsByTagName('inventario').item(0);
      var objs = inventario.getElementsByTagName('objeto');

      var objetos = [];
      for (let i = 0; i < objs.length; i++) {
        var nom = objs[i].getAttribute('nombre');
        var des = objs[i].getElementsByTagName('descripcion').item(0).firstChild.data;
        objetos.push(new Objeto(nom, des, null, null,null));
      }

      inventario = new Inventario(objetos);

      var magias = personaje.getElementsByTagName('magias').item(0);

      var atri = magias.getElementsByTagName('atributo').item(0).firstChild.data;
      var sal = magias.getElementsByTagName('salvacion').item(0).firstChild.data;
      var bon = magias.getElementsByTagName('bonificador').item(0).firstChild.data;

      var nivs = magias.getElementsByTagName('nivelMagia');
      var niveles =[];
      for (let i = 0; i < nivs.length; i++) {
        var niv = nivs.item(i).getAttribute('n')
        var usos = nivs.item(i).getElementsByTagName('usos').item(0).firstChild.data;

        var ms = nivs.item(i).getElementsByTagName('magia');
        var mags =[];
        for (let i = 0; i < ms.length; i++) {
          var nom = ms.item(i).getAttribute('nombre');
          var des = ms.item(i).getElementsByTagName('descripcion').item(0).firstChild.data;
          var comp = ms.item(i).getElementsByTagName('componentes').item(0).firstChild.data;

          mags.push(new Magia(nom,des,comp,null,null,null))
        }
        

        niveles.push(new NivelMagia(niv,usos,mags));
      }
    

      magias = new Magias(atri,sal,bon,niveles)


      try {
        var refs = personaje.getElementsByTagName('referencias').item(0).getElementsByTagName('referencia');
        var referencias = [];
        for (let i = 0; i < refs.length; i++) {
          referencias.push(refs.item(i).firstChild.data);
        }
      } catch (error) {
        var referencias = null;
      }
      
      try {
        var autor = personaje.getElementsByTagName('autor').item(0).firstChild.data;
      } catch (error) {
        var autor = null;
      }
      
      
      var per = new Personaje(nombre,raza,descripcion,transfondo,
        alinemiento,imagen,vida,movimiento,nivel,clase,experiencia,atributos,competencias,
        inventario,magias,referencias,autor);

      texto += per.texto();
    }
    this.areaVisualizacion = texto
    
  }
}

var lector = new Lector();