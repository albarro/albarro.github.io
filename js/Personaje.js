class Personaje {
  constructor(
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
  ) {
    this.nombre = nombre;
    this.raza = raza;
    this.descripcion = descripcion;
    this.transfondo = transfondo;
    this.alinemiento = alinemiento;
    this.imagen = imagen;

    this.vida = vida;
    this.movimiento = movimiento;

    this.nivel = nivel;
    this.clase = clase;
    this.experiencia = experiencia;
    this.movimiento = movimiento;

    this.atributos = atributos;
    this.competencias = competencias;
    this.inventario = inventario;
    this.magias = magias;

    this.referencias = referencias;
    this.autor = autor;
  }

  texto() {
    var texto ="<section>";


    texto += "<h3>" + this.nombre + "</h3>";
    texto += "<p>Raza: " + this.raza + "</p>";
    texto += "<p>Descripcion: " + this.descripcion + "</p>";
    texto += "<p>Transfondo: " + this.transfondo + "</p>";
    texto += "<p>Alineamiento: " + this.alinemiento + "</p>";

    texto += "<p>Vida: " + this.vida + "</p>";
    texto += "<p>Movimiento: " + this.movimiento + "</p>";

    texto += "<p>Nivel: " + this.nivel + "</p>";
    texto += "<p>Clase: " + this.clase + "</p>";
    texto += "<p>Experiencia: " + this.experiencia + "</p>";

    texto += this.atributos.texto();
    texto += this.competencias.texto();
    texto += this.inventario.texto();
    texto += this.magias.texto();

    texto +="</section>";
    return texto;
  }

  xml() {
    var xml = '<personaje nombre="' + this.nombre + '">';

    xml += "<raza>" + this.raza + "</raza>";
    xml += "<descripcion>" + this.descripcion + "</descripcion>";
    xml += "<transfondo>" + this.transfondo + "</transfondo>";
    xml += "<alinemiento>" + this.alinemiento + "</alinemiento>";

    xml += "<vida>" + this.vida + "</vida>";
    xml += "<movimiento>" + this.movimiento + "</movimiento>";

    xml += "<nivel>" + this.nivel + "</nivel>";
    xml += "<clase>" + this.clase + "</clase>";
    xml += "<experiencia>" + this.experiencia + "</experiencia>";

    xml += this.atributos.xml();
    xml += this.competencias.xml();
    xml += this.inventario.xml();
    xml += this.magias.xml();

    if (this.referencias) {
      for (let i = 0; i < referencias.length; i++) {
        xml += "<referencia>" + referencia[i] + "</referencia>";
      }
    }

    if (this.autor) {
      xml += "<autor>" + this.autor + "</autor>";
    }

    xml += "</personaje>";
    return xml;
  }
}

class Atributos {
  constructor(
    fuerza,
    destreza,
    constitucion,
    inteligencia,
    sabiduria,
    carisma
  ) {
    this.fuerza = fuerza;
    this.destreza = destreza;
    this.constitucion = constitucion;
    this.inteligencia = inteligencia;
    this.sabiduria = sabiduria;
    this.carisma = carisma;
  }

  texto() {
    var texto ="<section>";

    texto = "<h4>Atributos</h4>";
    texto += "<p>Fuerza: " + this.fuerza + "</p>";
    texto += "<p>Destreza: " + this.destreza + "</p>";
    texto += "<p>Constitucion: " + this.constitucion + "</p>";
    texto += "<p>Inteligencia: " + this.inteligencia + "</p>";
    texto += "<p>Sabiduria: " + this.sabiduria + "</p>";
    texto += "<p>Carisma: " + this.carisma + "</p>";

    texto +="</section>";
    return texto;
  }

  xml() {
    var xml = "<atributos>";
    xml += "<fuerza>" + this.fuerza + "</fuerza>";
    xml += "<destreza>" + this.destreza + "</destreza>";
    xml += "<constitucion>" + this.constitucion + "</constitucion>";
    xml += "<inteligencia>" + this.inteligencia + "</inteligencia>";
    xml += "<sabiduria>" + this.sabiduria + "</sabiduria>";
    xml += "<carisma>" + this.carisma + "</carisma>";
    xml += "</atributos>";
    return xml;
  }
}

class Competencias {
  constructor(bonificador, salvaciones, idiomas) {
    this.bonificador = bonificador;
    this.salvaciones = salvaciones;
    this.idiomas = idiomas;
  }

  texto() {
    var texto ="<section>";

    texto += "<h4>Competencias</h4>";

    texto += "<p>Bonificador: +" + this.bonificador + "</p>";
    texto += "<p>Salvaciones: ";
    for (let i = 0; i < this.salvaciones.length; i++) {
      texto += this.salvaciones[i] + ",";
    }
    texto += "</p>";

    texto += "<p>Idiomas: ";
    for (let i = 0; i < this.idiomas.length; i++) {
      texto += this.idiomas[i] + ",";
    }
    texto += "</p>";

    texto +="</section>";
    return texto;
  }

  xml() {
    var xml = "<competencias>";
    xml += "<bonificador>" + this.bonificador + "</bonificador>";

    xml += "<salvaciones>";
    for (let i = 0; i < this.salvaciones.length; i++) {
      xml += "<atributo>" + this.salvaciones[i] + "</atributo>";
    }
    xml += "</salvaciones>";

    xml += "<idiomas>";
    for (let i = 0; i < this.idiomas.length; i++) {
      xml += "<idioma>" + this.idiomas[i] + "</idioma>";
    }
    xml += "</idiomas>";

    xml += "</competencias>";
    return xml;
  }
}

class Objeto {
  constructor(nombre, descripcion, referencia, imagenes, video) {
    this.nombre = nombre;
    this.descripcion = descripcion;

    this.referencia = referencia;
    this.imagenes = imagenes;
    this.video = video;
  }

  texto() {
    var texto = "<dt>" + this.nombre + "</dt>";
    texto += "<dd>Descripcion: " + this.descripcion + "</dd>";
    return texto;
  }

  xml() {
    var xml = '<objeto nombre="' + this.nombre + '">';
    xml += "<descripcion>" + this.descripcion + "</descripcion>";
    if (this.referencia != null) {
      xml += "<referencia>" + this.referencia + "</referencia>";
    }
    if (this.imagenes != null) {
      xml += "<imagenes>";
      for (let i = 0; i < this.imagenes.length; i++) {
        xml += "<imagen>" + this.imagenes[i] + "</imagen>";
      }
      xml += "</imagenes>";
    }
    if (this.video) {
      xml += "<video>" + this.video + "</video>";
    }
    xml += "</objeto>";
    return xml;
  }
}

class Inventario {
  constructor(objetos) {
    this.objetos = objetos;
  }

  texto() {
    var texto = "<section>";

    texto += "<h4>Inventario</h4>";
    for (let i = 0; i < this.objetos.length; i++) {
      texto += this.objetos[i].texto();
    }
    texto += "</section>";
    return texto;
  }

  xml() {
    var xml = "<inventario>";
    for (let i = 0; i < this.objetos.length; i++) {
      xml += this.objetos[i].xml();
    }
    xml += "</inventario>";
    return xml;
  }
}

class Magias {
  constructor(atributo, salvacion, bonificador, nivelesMagia) {
    this.atributo = atributo;
    this.salvacion = salvacion;
    this.bonificador = bonificador;

    this.nivelesMagia = nivelesMagia;
  }

  texto() {
    var texto = "<section>";
    texto += "<h4>Magias</h4>";
    texto += "<p>Atributo magico: " + this.atributo + "</p>";
    texto += "<p>Salvacion magica: " + this.salvacion + "</p>";
    texto += "<p>Bonificador magico: " + this.bonificador + "</p>";
    for (let i = 0; i < this.nivelesMagia.length; i++) {
      texto += this.nivelesMagia[i].texto();
    }
    texto += "</section>";
    return texto;
  }

  xml() {
    var xml = "<magias>";
    xml += "<atributo>" + this.atributo + "</atributo>";
    xml += "<salvacion>" + this.salvacion + "</salvacion>";
    xml += "<bonificador>" + this.salvacion + "</bonificador>";
    this.nivelesMagia.forEach((nivel) => {
      xml += nivel.xml();
    });
    xml += "</magias>";

    return xml;
  }
}

class NivelMagia {
  constructor(nivel, usos, magias) {
    this.nivel = nivel;
    this.usos = usos;
    this.magias = magias;
  }

  texto() {
    var texto = "<section>";
    texto += "<p>Nivel: " + this.nivel + "</p> <p>Usos: "+ this.usos + "</p>";
    texto += "<h5>Magias:</h5>";
    for (let i = 0; i < this.magias.length; i++) {
      texto += this.magias[i].texto();
    }
    texto += "</section>";
    return texto;
  }

  xml() {
    var xml = '<nivelMagia n="' + this.nivel + '">';
    xml += "<usos>" + this.usos + "</usos>";
    this.magias.forEach((magia) => {
      xml += magia.xml();
    });
    xml += "</nivelMagia>";

    return xml;
  }
}

class Magia {
  constructor(nombre, descripcion, componentes, referencia, imagenes, video) {
    this.nombre = nombre;
    this.descripcion = descripcion;

    this.componentes = componentes;

    this.referencia = referencia;
    this.imagenes = imagenes;
    this.video = video;
  }

  texto() {
    var texto = "<h6>" + this.nombre + "</h6>";
    texto += "<p> Descripcion: " + this.descripcion + "</p>";
    texto += "<p> Componentes: " + this.componentes + "</p>";
    return texto;
  }

  xml() {
    var xml = '<magia nombre="' + this.nombre + '">';
    xml += "<descripcion>" + this.descripcion + "</descripcion>";
    xml += "<componentes>" + this.componentes + "</componentes>";
    if (this.referencia != null) {
      xml += "<referencia>" + this.referencia + "</referencia>";
    }
    if (this.imagen != null) {
      xml += "<imagenes>";
      this.nivelesMagia.forEach((nivel) => {
        xml += nivel.xml();
      });
      xml += "</imagenes>";
    }
    if (this.video) {
      xml += "<video>" + this.video + "</video>";
    }
    xml += "</magia>";

    return xml;
  }
}
