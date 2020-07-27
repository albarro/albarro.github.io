class Generador {
  constructor() {
    
    this.nilsMags = 1;
    this.magias = [[]];

    this.numImgObj = 0;
    this.objetos = [];
  }

  validar() {
    var datos = $("form").serializeArray();

    var campos = [];
    datos.forEach((dato) => {
      campos[dato.name] = dato.value;
    });

    var nombre = campos.nombre;
    var raza = campos.raza;
    var descripcion = campos.descripcion;
    var transfondo = campos.transfondo;
    var alinemiento = campos.alinemiento;

    var imagen = "null";

    var vida = campos.vida;
    var movimiento = campos.movimiento;

    var nivel = campos.nivel;
    var clase = campos.clase;
    var experiencia = campos.experiencia;

    var fuerza = campos.fuerza;
    var destreza = campos.destreza;
    var constitucion = campos.constitucion;
    var inteligencia = campos.inteligencia;
    var sabiduria = campos.sabiduria;
    var carisma = campos.carisma;
    var atributos = new Atributos(
      fuerza,
      destreza,
      constitucion,
      inteligencia,
      sabiduria,
      carisma
    );

    var bonificador = campos.bonificador;
    var salvaciones = [];
    if (campos.atributofuerza != null) salvaciones.push('Fuerza');
    if (campos.atributodestreza != null) salvaciones.push('Destreza');
    if (campos.atributoconstitucion != null) salvaciones.push('Constitucion');
    if (campos.atributointeligencia != null) salvaciones.push('Inteligencia');
    if (campos.atributosabiduria != null) salvaciones.push('Sabiduria');
    if (campos.atributocarisma != null) salvaciones.push('Carisma');

    var idiomas = [];
    datos.forEach((dato) => {
      if (dato.name == "idioma") {
        idiomas.push(dato.value);
      }
    });
    
    var competencias = new Competencias(bonificador, salvaciones, idiomas);

    var inventario = new Inventario(this.objetos);

    var niveles = [];
    var niv;
    var usos;
    for (let i = 1; i < this.magias.length; i++) {
      niv = campos['nivel'+i];
      usos = campos['usosNiv'+i];
      niveles.push(new NivelMagia(niv, usos, this.magias[i]))
    }

    var atrMag = campos.atrMag;
    var salMag = campos.salMag;
    var bofMag = campos.bofMag;

    var magias = new Magias(atrMag, salMag, bofMag, niveles);

    var referencias = null;
    if(campos.referencia){
      referencias = [];
    datos.forEach((dato) => {
      if (dato.name == "referencia") {
        referencias.push(dato.value);
      }
    });
  }
    var autor = null;
    if (campos.autor) autor = campos["autor"];

    if (event.returnValue) {
      this.cargarDatos(
        new Personaje(
          nombre,
          raza,
          descripcion,
          transfondo,
          alinemiento,
          imagen,
          vida,
          movimiento,
          nivel,
          clase,
          experiencia,
          atributos,
          competencias,
          inventario,
          magias,
          referencias,
          autor
        )
      );
    }
  }

  añadirIdioma() {
    $("#idiomas").after('<p><input type="text" name="idioma"></p>');
  }

  añadirObjeto() {
    $("#inventario").after(
      '<section id="creacionObjeto">' +
        '<p>Nombre</p><p><input type="text" name="nombreObj"></p>' +
        '<p>Descripcion</p><p><input type="text" name="descripcionObj"></p>' +
        '<p><input type="button" onclick="generador.crearObjeto()" value="Crear objeto"></p>' +
      '</section>'
    );
    $("#inventario").hide();
  }

  crearObjeto() {
    this.numImgObj = 0;

    var datos = $("form").serializeArray();

    var campos = [];
    datos.forEach((dato) => {
      campos[dato.name] = dato.value;
    });

    var nom = campos.nombreObj;
    if(nom == ""){
      alert('El objeto necesita un nombre');
      return;
    }
    var des = campos.descripcionObj;
    if(des == ""){
      alert('El objeto necesita una descripcion');
      return;
    }

    var ref = null;
    var imgs = null;
    var vid = null;
    if (campos.refObj != undefined) ref = campos.refObj;
    if (campos.imgObj != undefined) {
      imgs = [];
      datos.forEach((dato) => {
        if (dato.name == "imgObj") {
          imgs.push(dato.value);
        }
      });
    }
    if (campos.vidObj != undefined) vid = campos.vidObj;

    var obj = new Objeto(nom, des, ref, imgs, vid)
    this.objetos.push(obj);

    $("#inventario").show();

    $("#inventario").after(
      '<section id="'+nom+'">' +
        '<br>' + obj.texto() + '</br>' +
        '<p><input type="button" onclick="generador.borrarObjeto(\'' + nom + '\')" value="Borrar objeto"></p>' +
        "</section>"
    );

    $("#creacionObjeto").remove();
  }

  borrarObjeto(obj){
    for (let i = 0; i < this.objetos.length; i++) {
      if(this.objetos[i] == obj)
        array.splice(i, 1);
        $("#"+obj).remove();      
    }
  }

  añadirRefObj() {
    $("#refObj").after(
      '<p>Referencia</p><p><input type="text" name="refObj"></p>'
    );
    $("#refObj").remove();
  }

  añadirImgObj() {
    if (this.numImgObj < 3) {
      $("#imgObj").after(
        '<p>Imagen</p><p><input type="text" name="imgObj"></p>'
      );
      this.numImgObj += 1;
    } else {
      $("#imgObj").remove();
    }
  }

  añadirVidObj() {
    $("#vidObj").after(
      '<p>Video</p><p><input type="text" name="vidObj"></p>'
    );
    $("#vidObj").remove();
  }

  añadirNivel() {
    $("#nivel").after(
      "<section><p>Nivel "+(this.nilsMags)+"</p>" +
        '<input type="hidden" name="nivel'+this.nilsMags+'" value="'+this.nilsMags+'">' +
        '<p>Usos</p><p><input type="text" name="usosNiv'+this.nilsMags+'"></p>' +
        '<p><input type="button" onclick="generador.añadirMagia('+this.nilsMags+
        ')" value="Añadir magia" id="nivMag"></p>' +
        "</section>"
    );
    this.magias.push([]);
    this.nilsMags += 1;
  }

  añadirMagia(niv) {
    $("#nivMag").after(
      '<section id="creacionMagia">' +
        '<p>Nombre</p><p><input type="text" name="nomMag"></p>' +
        '<p>Descripcion</p><p><input type="text" name="desMag"></p>' +
        '<p>Componentes</p><p><input type="text" name="comMag"></p>' +
        '<p><input type="button" onclick="generador.crearMagia('+niv+')" value="Crear Magia"></p>' +
      '</section>'
    );
    $("#nivMag").hide();

  }

  crearMagia(niv) {
    this.numImgMag = 0;

    var datos = $("form").serializeArray();

    var campos = [];
    datos.forEach((dato) => {
      campos[dato.name] = dato.value;
    });

    var nom = campos.nomMag;
    if(nom == ""){
      alert('La magia necesita un nombre');
      return;
    }
    var des = campos.desMag;
    if(des == ""){
      alert('La magia necesita una descripcion');
      return;
    }
    var com = campos.comMag;
    if(com == ""){
      alert('La magia necesita componentes');
      return;
    }

    var ref = null;
    var imgs = null;
    var vid = null;
    if (campos.refObj != undefined) ref = campos.refObj;
    if (campos.imgObj != undefined) {
      imgs = [];
      datos.forEach((dato) => {
        if (dato.name == "imgObj") {
          imgs.push(dato.value);
        }
      });
    }
    if (campos.vidObj != undefined) vid = campos.vidObj;

    var magia = new Magia(nom, des, com, ref, imgs, vid);
    this.magias[niv].push(magia);

    $("#nivMag").show();

    $("#nivMag").after(
      '<section id="Mag'+nom+'">' +
        '<br>' + magia.texto() + '</br>' +
        '<p><input type="button" onclick="generador.borrarMagia(\'Mag'+nom+'\')" value="Borrar magia"></p>' +
        "</section>"
    );

    $("#creacionMagia").remove();
  }

  añadirRefMag() {
    $("#refMag").after(
      '<p>Referencia</p><p><input type="text" name="refMag"></p>'
    );
    $("#refMag").remove();
  }

  añadirImgMag() {
    if (this.numImgMag < 3) {
      $("#imgMag").after(
        '<p>Imagen</p><p><input type="text" name="imgMag"></p>'
      );
      this.numImgMag += 1;
    } else {
      $("#imgMag").remove();
    }
  }

  añadirVidMag() {
    $("#vidMag").after(
      '<p>Video</p><p><input type="text" name="vidMag"></p>'
    );
    $("#vidMag").remove();
  }

  cargarDatos(personaje) {
    var file = new Blob([personaje.xml()], { type: "text/xml" });

      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = "personaje";
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  
}

var generador = new Generador();
