class Cargador {
  constructor() {}

  leerArchivo(files) {
    var archivo = files[0];
    var canvas = document.getElementById("canvas");
    console.log("Leo archivo " + archivo.name);

    var tipoImagen = "image/*";
    if (FileReader && files && files.length && archivo.type.match(tipoImagen)) {
      var fr = new FileReader();
      canvas = canvas.getContext("2d");

      var img1 = new Image();

      fr.onload = function () {
        img1.src = fr.result;
      };
      fr.readAsDataURL(files[0]);

      img1.onload = function () {
        dibujo.añadirFigura(img1);
      };
    } else {
      alert("El tipo de fichero no es soportado");
    }
  }
}

class Dibujo {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cw = this.canvas.width;
    this.ch = this.canvas.height;
    console.log("Cw: " + this.cw + " Ch: " + this.ch);

    this.reOffset();
    this.imagenes = [];
    this.arrastro = false;
  }

  reOffset() {
    var BB = this.canvas.getBoundingClientRect();
    this.offsetX = BB.left;
    this.offsetY = BB.top;
  }

  añadirFigura(img) {
    this.imagenes.push({
      x: 30,
      y: 10,
      width: img.width,
      height: img.height,
      imagen: img,
    });
    this.drawAll();
  }

  drawAll() {
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    for (var i = 0; i < this.imagenes.length; i++) {
      var img = this.imagenes[i];
      this.ctx.drawImage(img.imagen, img.x, img.y);
    }
  }

  sobreImagen(mx, my, img) {
    if (img.imagen) {
      var ix = img.x;
      var iw = img.x + img.width;
      var iy = img.y;
      var ih = img.y + img.height;
      if (mx > ix && mx < iw && my > iy && my < ih) {
        return true;
      }
    }
    return false;
  }

  isArrastrando() {
    return this.arrastro;
  }

  noArrastrar() {
    this.arrastro = false;
  }

  arrastrar() {
    this.arrastro = true;
  }

  coger(e) {
    this.startX = parseInt(e.clientX - this.offsetX);
    this.startY = parseInt(e.clientY - this.offsetY);

    for (var i = 0; i < this.imagenes.length; i++) {
      if (this.sobreImagen(this.startX, this.startY, this.imagenes[i])) {
        this.indexImagen = i;
        this.arrastrar();
        return;
      }
    }
  }

  mover(e) {
    var mouseX = parseInt(e.clientX - this.offsetX);
    var mouseY = parseInt(e.clientY - this.offsetY);
    var dx = mouseX - this.startX;
    var dy = mouseY - this.startY;

    var imagen = this.imagenes[this.indexImagen];
    imagen.x += dx;
    imagen.y += dy;

    this.drawAll();

    this.startX = mouseX;
    this.startY = mouseY;
  }
}

class GestorEventos {
  constructor(dibujo) {
    this.dibujo = dibujo;
    var canvas = dibujo.canvas;

    //Gestionamos los eventos del canvas
    canvas.onmousedown = this.handleMouseDown.bind(this);
    canvas.onmousemove = this.handleMouseMove.bind(this);
    canvas.onmouseup = this.handleMouseUpOrOut.bind(this);
    canvas.onmouseout = this.handleMouseUpOrOut.bind(this);
  }

  handleMouseDown(e) {
    this.evitarPorDefecto(e);

    this.dibujo.coger(e);
  }

  handleMouseUpOrOut(e) {
    if (!this.dibujo.isArrastrando()) {
      return;
    }
    this.evitarPorDefecto(e);

    this.dibujo.noArrastrar();
  }

  handleMouseMove(e) {
    if (!this.dibujo.isArrastrando()) {
      return;
    }
    this.evitarPorDefecto(e);

    this.dibujo.mover(e);
  }

  evitarPorDefecto(e) {
    e.preventDefault();
    e.stopPropagation();
  }
}

window.onscroll = function (e) {
  dibujo.reOffset();
};
window.onresize = function (e) {
  dibujo.reOffset();
};
canvas.onresize = function (e) {
  dibujo.reOffset();
};

class Dado {
  constructor() {
    this.url = "//roll.diceapi.com/json/";
    this.error =
      "<h2>Error(No puedo obtener información de <a href='http://roll.diceapi.com/'>diceApi</a>)</h2>";
    this.correcto = "Valor de tirada ";
  }
  tirarDado(dado) {
    var elem = this;
    $.ajax({
      async: true,
      crossDomain: true,
      dataType: "json",
      url: this.url + dado,
      method: "GET",
      headers: {
        "cache-control": "no-cache",
      },
      success: function (datos) {
        elem.cargarDatos(datos.datos);
      },
      error: function () {
        $("#resultado").html(this.error);
      },
    });
  }
  cargarDatos(link) {
    var elem = this;
    $.ajax({
      dataType: "json",
      url: link,
      method: "GET",
      success: function (datos) {
        elem.json = JSON.stringify(datos, null, 2);

        var resultado =
          "<p>Valor: " + datos[0].nombre + " Dado: " + datos + "</p>";

        elem.string = resultado;
        elem.verJSON();
      },
      error: function () {},
    });
  }
  verJSON() {
    //Muestra el archivo JSON recibido
    $("#resultado").html(this.string);
  }
}

var dado = new Dado();

var dibujo = new Dibujo();
var cargador = new Cargador();
var gestor = new GestorEventos(dibujo, cargador);

cargador.leerArchivo(
  new File(["ficha negra"], "multimedia/Ficha negra.png", { type: "image/png" })
);
