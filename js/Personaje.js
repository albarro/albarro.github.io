class Personaje {
  constructor(nombre, raza, descripcion, transfondo, alinemiento, imagen,
      vida, movimiento, nivel, clase, experiencia, atributos, competencias, 
      inventario, magias, referencias, autor) {
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

    texto(){
      texto = this.nombre;
      return texto;
    }
  
    xml(){
      xml = "<personaje nombre=\"" + this.nombre + "\">"

      xml += "<raza>" + this.raza + "</raza>"
      xml += "<descripcion>" + this.descripcion + "</descripcion>"
      xml += "<transfondo>" + this.transfondo + "</transfondo>"
      xml += "<alinemiento>" + this.alinemiento + "</alinemiento>"
      xml += "<imagen>" + this.imagen + "</imagen>"

      xml += "<vida>" + this.vida + "</vida>"
      xml += "<movimiento>" + this.movimiento + "</movimiento>"

      xml += "<nivel>" + this.nivel + "</nivel>"
      xml += "<clase>" + this.clase + "</clase>"
      xml += "<experiencia>" + this.experiencia + "</experiencia>"

      xml += this.atributos.xml();
      xml += this.competencias.xml();
      xml += this.inventario.xml();
      xml += this.magias.xml();

      this.referencias.forEach(referencia => {
        xml += "<referencia>" + referencia + "</referencia>"
      });

      if(this.autor){
        xml += "<autor>" + this.autor + "</autor>"
      }

      xml += "</personaje>"
      return xml;
    }
}


class Atributos{
  constructor(fuerza, destreza, constitucion,
    inteligencia, sabiduria, carisma){
      this.fuerza = fuerza;
      this.destreza = destreza;
      this.constitucion = constitucion;
      this.inteligencia = inteligencia;
      this.sabiduria = sabiduria;
      this.carisma = carisma;
    }

    texto(){
      texto = "Atributos: \n"
      texto += this.fuerza +"\n"
      texto += this.destreza +"\n"
      texto += this.constitucion +"\n"
      texto += this.inteligencia +"\n"
      texto += this.sabiduria +"\n"
      texto += this.carisma +"\n"
      return texto;
    }
  
    xml(){
      xml = "<atributos>"
      xml += "<fuerza>"+ this.fuerza +"</fuerza>"
      xml += "<destreza>"+ this.destreza +"</destreza>"
      xml += "<constitucion>"+ this.constitucion +"</constitucion>"
      xml += "<inteligencia>"+ this.inteligencia +"</inteligencia>"
      xml += "<sabiduria>"+ this.sabiduria +"</sabiduria>"
      xml += "<carisma>"+ this.carisma +"</carisma>"
      xml += "</atributos>"
      return xml;
    }

}

class Competencias{
  constructor(bonificador, salvaciones, habilidades,
    idiomas){
      this.bonificador = bonificador;
      this.salvaciones = salvaciones;
      this.habilidades = habilidades;
      this.idiomas = idiomas;
    }

    texto(){
      texto = "Competencias: \n"
      return texto;
    }
  
    xml(){
      xml = "<competencias>"
      xml += "<bonificador>"+ this.bonificador +"</bonificador>"

      xml += "<salvaciones>"
      this.salvaciones.forEach(atributo => {
        xml += "<atributo>" + atributo + "</atributo>"
      });
      xml += "</salvaciones>"

      xml += "<habilidades>"
      this.habilidades.forEach(habilidad => {
        xml += "<habilidad>" + habilidad + "</habilidad>"
      });
      xml += "</habilidades>"

      xml += "<idiomas>"
      this.idiomas.forEach(idioma => {
        xml += "<idioma>" + idioma + "</idioma>"
      });
      xml += "</idiomas>"

      xml += "</competencias>"
      return xml;
    }

}


class Objeto{
  constructor(nombre, descripcion, referencia, imagenes, video){
    this.nombre = nombre;
    this.descripcion = descripcion;

    this.referencia = referencia;
    this.imagenes = imagenes;
    this.video = video;
  }

  texto(){
    texto = this.nombre
    return texto;
  }

  xml(){
    xml = "<objeto nombre=\"" + this.nombre + "\">"
    xml += "<descripcion>" + this.descripcion + "</descripcion>"
    if(this.referencia != null){
      xml += "<referencia>" + this.referencia + "</referencia>"
    }
    if(this.imagen != null){
      xml += "<imagenes>"
      this.nivelesMagia.forEach(nivel => {
        xml += nivel.xml()
      });
      xml += "</imagenes>"
    }
    if(this.video){
      xml += "<video>" + this.video + "</video>"
    }
    xml += "</objeto>"
    return xml;
  }
}

class Magias{
  constructor(atributo, salvacion, bonificador, nivelesMagia){
  this.atributo = atributo;
  this.salvacion = salvacion;
  this.bonificador = bonificador;

  this.nivelesMagia = nivelesMagia;
  }

  texto(){
    texto = "magia"
    return texto;
  }

  xml(){
    xml = "<magias>"
    xml += "<atributo>" + this.atributo + "</atributo>"
    xml += "<salvacion>" + this.salvacion + "</salvacion>"
    xml += "<bonificador>" + this.salvacion + "</bonificador>"
    this.nivelesMagia.forEach(nivel => {
      xml += nivel.xml()
    });
    xml += "</magias>"

    return xml;
  }
}

class NivelMagia{
  constructor(nivel, usos, magias){
    this.nivel = nivel;
    this.usos = usos;
    this.magias = magias;
  }

  texto(){
    texto = this.nivel
    return texto;
  }

  xml(){
    xml = "<nivelMagia n=\"" + this.nivel + "\">"
    xml += "<usos>" + this.usos + "</usos>"
    this.magias.forEach(magia => {
      xml += magia.xml()
    });
    xml += "</nivelMagia>"

    return xml;
  }

}

class Magia{
  constructor(nombre, descripcion, componentes, referencia, imagenes, video){
    this.nombre = nombre;
    this.descripcion = descripcion;

    this.componentes = componentes;  

    this.referencia = referencia;
    this.imagenes = imagenes;
    this.video = video;
  }

  texto(){
    texto = this.nombre
    return texto;
  }

  xml(){
    xml = "<magia nombre=\"" + this.nombre + "\">"
    xml += "<descripcion>" + this.descripcion + "</descripcion>"
    xml += "<componentes>" + this.componentes + "</componentes>"
    if(this.referencia != null){
      xml += "<referencia>" + this.referencia + "</referencia>"
    }
    if(this.imagen != null){
      xml += "<imagenes>"
      this.nivelesMagia.forEach(nivel => {
        xml += nivel.xml()
      });
      xml += "</imagenes>"
    }
    if(this.video){
      xml += "<video>" + this.video + "</video>"
    }
    xml += "</magia>"

    return xml;
  }
}
