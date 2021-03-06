class Cargador {
  constructor() {}

  leerArchivo(files) {
    let archivo = files[0];
    let canvas = document.getElementById("canvas");
    console.log("Leo archivo " + archivo.name);

    let tipoImagen = "image/*";
    if (FileReader && files && files.length && archivo.type.match(tipoImagen)) {
      let fr = new FileReader();
      canvas = canvas.getContext("2d");

      let img1 = new Image();

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
    let BB = this.canvas.getBoundingClientRect();
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
    for (let i = 0; i < this.imagenes.length; i++) {
      let img = this.imagenes[i];
      this.ctx.drawImage(img.imagen, img.x, img.y);
    }
  }

  sobreImagen(mx, my, img) {
    if (img.imagen) {
      let ix = img.x;
      let iw = img.x + img.width;
      let iy = img.y;
      let ih = img.y + img.height;
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

    for (let i = 0; i < this.imagenes.length; i++) {
      if (this.sobreImagen(this.startX, this.startY, this.imagenes[i])) {
        this.indexImagen = i;
        this.arrastrar();
        return;
      }
    }
  }

  mover(e) {
    let mouseX = parseInt(e.clientX - this.offsetX);
    let mouseY = parseInt(e.clientY - this.offsetY);
    let dx = mouseX - this.startX;
    let dy = mouseY - this.startY;

    let imagen = this.imagenes[this.indexImagen];
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
    let canvas = dibujo.canvas;

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



let dibujo = new Dibujo();
let cargador = new Cargador();
let gestor = new GestorEventos(dibujo, cargador);
