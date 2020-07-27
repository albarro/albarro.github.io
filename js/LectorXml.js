class Lector {
  constructor() {}

  cargarDatos() {
    let elem = this;
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        elem.leerXml(this);
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

    $("#areaTexto").html(this.areaVisualizacion);
  }

  leerXml(xml) {
    let xmldoc = xml.responseXML;

    let personajes = xmldoc.getElementsByTagName("personaje");
    this.perjs = [];

    for (let i = 0; i < personajes.length; i++) {
      let personaje = personajes.item(i);

      let nombre = personaje.getAttribute("nombre");
      let raza = personaje.getElementsByTagName("raza").item(0).firstChild.data;
      let descripcion = personaje.getElementsByTagName("descripcion").item(0)
        .firstChild.data;
      let transfondo = personaje.getElementsByTagName("transfondo").item(0)
        .firstChild.data;
      let alinemiento = personaje.getElementsByTagName("alinemiento").item(0)
        .firstChild.data;

      let vida = personaje.getElementsByTagName("vida").item(0).firstChild.data;
      let movimiento = personaje.getElementsByTagName("movimiento").item(0)
        .firstChild.data;

      let nivel = personaje.getElementsByTagName("nivel").item(0).firstChild
        .data;
      let clase = personaje.getElementsByTagName("clase").item(0).firstChild
        .data;
      let experiencia = personaje.getElementsByTagName("experiencia").item(0)
        .firstChild.data;

      let atributos = personaje.getElementsByTagName("atributos").item(0);

      let fuerza = atributos.getElementsByTagName("fuerza").item(0).firstChild
        .data;
      let destreza = atributos.getElementsByTagName("destreza").item(0)
        .firstChild.data;
      let constitucion = atributos.getElementsByTagName("constitucion").item(0)
        .firstChild.data;
      let inteligencia = atributos.getElementsByTagName("inteligencia").item(0)
        .firstChild.data;
      let sabiduria = atributos.getElementsByTagName("sabiduria").item(0)
        .firstChild.data;
      let carisma = atributos.getElementsByTagName("carisma").item(0).firstChild
        .data;

      atributos = new Atributos(
        fuerza,
        destreza,
        constitucion,
        inteligencia,
        sabiduria,
        carisma
      );

      let competencias = personaje.getElementsByTagName("competencias").item(0);

      let bonificador = competencias.getElementsByTagName("bonificador").item(0)
        .firstChild.data;
      let atris = competencias
        .getElementsByTagName("salvaciones")
        .item(0)
        .getElementsByTagName("atributo");
      let salvaciones = [];
      for (let i = 0; i < atris.length; i++) {
        salvaciones.push(atris.item(i).firstChild.data);
      }
      let ids = competencias
        .getElementsByTagName("idiomas")
        .item(0)
        .getElementsByTagName("idioma");
      let idiomas = [];
      for (let i = 0; i < ids.length; i++) {
        idiomas.push(ids.item(i).firstChild.data);
      }

      competencias = new Competencias(bonificador, salvaciones, idiomas);

      let inventario = personaje.getElementsByTagName("inventario").item(0);
      let objs = inventario.getElementsByTagName("objeto");

      let objetos = [];
      for (let i = 0; i < objs.length; i++) {
        let nom = objs[i].getAttribute("nombre");
        let des = objs[i].getElementsByTagName("descripcion").item(0).firstChild
          .data;
        objetos.push(new Objeto(nom, des, null, null, null));
      }

      inventario = new Inventario(objetos);

      let magias = personaje.getElementsByTagName("magias").item(0);

      let atri = magias.getElementsByTagName("atributo").item(0).firstChild
        .data;
      let sal = magias.getElementsByTagName("salvacion").item(0).firstChild
        .data;
      let bon = magias.getElementsByTagName("bonificador").item(0).firstChild
        .data;

      let nivs = magias.getElementsByTagName("nivelMagia");
      let niveles = [];
      for (let i = 0; i < nivs.length; i++) {
        let niv = nivs.item(i).getAttribute("n");
        let usos = nivs.item(i).getElementsByTagName("usos").item(0).firstChild
          .data;

        let ms = nivs.item(i).getElementsByTagName("magia");
        let mags = [];
        for (let i = 0; i < ms.length; i++) {
          let nom = ms.item(i).getAttribute("nombre");
          let des = ms.item(i).getElementsByTagName("descripcion").item(0)
            .firstChild.data;
          let comp = ms.item(i).getElementsByTagName("componentes").item(0)
            .firstChild.data;

          mags.push(new Magia(nom, des, comp, null, null, null));
        }

        niveles.push(new NivelMagia(niv, usos, mags));
      }

      magias = new Magias(atri, sal, bon, niveles);


      let per = new Personaje(
        nombre,
        raza,
        descripcion,
        transfondo,
        alinemiento,
        null,
        vida,
        movimiento,
        nivel,
        clase,
        experiencia,
        atributos,
        competencias,
        inventario,
        magias,
        null,
        null
      );

      this.perjs.push(per);
    }
    this.areaVisualizacion = "Personajes: ";
    this.perjs.forEach((personaje) => {
      this.areaVisualizacion +=
        '<button onclick="lector.mostrarPersonaje(\'' +
        personaje.nombre +
        '\')">' +
        personaje.nombre +
        "</button>";
    });
  }

  mostrarPersonaje(nombre) {
    this.perjs.forEach((personaje) => {
      if (personaje.nombre == nombre) {
        let per = "<br>" + personaje.texto() + "</br>";
        $("#areaTexto").html(this.areaVisualizacion + per);
      }
    });
  }
}

let lector = new Lector();
