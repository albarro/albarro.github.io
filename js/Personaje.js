"use strict";

class Personaje {
    constructor(nombre, clase, nivel, transfondo, nombreJugador, raza, alinemiento, experiencia, personalidad,
                ideales, vinculos, defectos, rasgos, compEIdiomas, edad, altura, peso, ojos, piel, pelo, aspectoImg,
                historia, aliados, carteristicas) {

        this.nombre = nombre;

        this.clase = clase;
        this.nivel = nivel;
        this.transfondo = transfondo;
        this.nombreJugador = nombreJugador;

        this.raza = raza;
        this.alinemiento = alinemiento;
        this.experiencia = experiencia;

        this.personalidad = personalidad;
        this.ideales = ideales;
        this.vinculos = vinculos;
        this.defectos = defectos;

        this.rasgos = rasgos;
        this.compEIdiomas = compEIdiomas;

        this.edad = edad;
        this.altura = altura;
        this.peso = peso;
        this.ojos = ojos;
        this.piel = piel;
        this.pelo = pelo;

        this.aspectoImg = aspectoImg;

        this.historia = historia;

        this.aliados = aliados;

        this.carteristicas = carteristicas;
        //TODO Añadir a los parametros
        this.inventario = inventario;
        this.magias = magias;
    }


}

//TODO Encontrar forma de guardar competencia valor y modificador
class Caracteristicas {
    constructor(fuerzaPunt, destrezaPunt, constitucionPunt, inteligenciaPunt,
                sabiduriaPunt, carismaPunt, bonificador) {
        this.fuerza = new Caracteristica(caracts.FUERZA, fuerzaPunt);
        this.destreza = new Caracteristica(caracts.DESTREZA, destrezaPunt);
        this.constitucion = new Caracteristica(caracts.CONSTITUCION, constitucionPunt);
        this.inteligencia = new Caracteristica(caracts.INTELIGENCIA, inteligenciaPunt);
        this.sabiduria = new Caracteristica(caracts.SABIDURIA, sabiduriaPunt);
        this.carisma = new Caracteristica(caracts.CARISMA, carismaPunt);

        this.bonificador = bonificador;

        this.calcularSalvaciones();
        this.calcularHabilidades();
    }


    calcularSalvaciones(){
        this.salFuerza = new Habilidad(caracts.FUERZA, this.fuerza, this.bonificador);
        this.salDestreza = new Habilidad(caracts.DESTREZA, this.destreza, this.bonificador);
        this.salConstitucion = new Habilidad(caracts.CONSTITUCION, this.constitucion, this.bonificador);
        this.salInteligencia = new Habilidad(caracts.INTELIGENCIA, this.inteligencia, this.bonificador);
        this.salSabiduria = new Habilidad(caracts.SABIDURIA, this.sabiduria, this.bonificador);
        this.salCarisma = new Habilidad(caracts.CARISMA, this.carisma, this.bonificador);

    }

    calcularHabilidades(){
        //Fuerza
        this.atletismo = new Habilidad(habils.ATLETISMO, this.fuerza, this.bonificador);

        //Destreza
        this.acrobacia = new Habilidad(habils.ACROBACIAS, this.destreza, this.bonificador);
        this.juegoDeManos = new Habilidad(habils.JUEGO_DE_MANOS, this.destreza, this.bonificador);
        this.sigilo = new Habilidad(habils.SIGILO, this.destreza, this.bonificador);

        //Inteligencia
        this.arcano = new Habilidad(habils.ARCANO, this.inteligencia, this.bonificador);
        this.historia = new Habilidad(habils.HISTORIA, this.inteligencia, this.bonificador);
        this.investigacion = new Habilidad(habils.INVESTIGACION, this.inteligencia, this.bonificador);
        this.naturaleza = new Habilidad(habils.NATURALEZA, this.inteligencia, this.bonificador);
        this.religion = new Habilidad(habils.RELIGION, this.inteligencia, this.bonificador);

        //Sabiduría
        this.tratoDeAnimales = new Habilidad(habils.TRATO_DE_ANIMALES, this.sabiduria, this.bonificador);
        this.medicina = new Habilidad(habils.MEDICINA, this.sabiduria, this.bonificador);
        this.percepcion = new Habilidad(habils.PERCEPCION, this.sabiduria, this.bonificador);
        this.perspicacia = new Habilidad(habils.PERSPICACIA, this.sabiduria, this.bonificador);
        this.supervivencia = new Habilidad(habils.SUPERVIVENCIA, this.sabiduria, this.bonificador);

        //Carisma
        this.engaño = new Habilidad(habils.ENGAÑO, this.sabiduria, this.bonificador);
        this.intimidacion = new Habilidad(habils.INTIMIDACION, this.sabiduria, this.bonificador);
        this.interpretacion = new Habilidad(habils.INTERPRETACION, this.sabiduria, this.bonificador);
        this.persuasion = new Habilidad(habils.PERSUASION, this.sabiduria, this.bonificador);
    }

}

const caracts = {
    FUERZA: 'Fuerza',
    DESTREZA: 'Destreza',
    CONSTITUCION: 'Constitucion',
    INTELIGENCIA: 'Inteligencia',
    SABIDURIA: 'Sabiduria',
    CARISMA: 'Carisma'
}

const habils = {
    ATLETISMO: 'Atletismo',

    ACROBACIAS: 'Acrobacias',
    JUEGO_DE_MANOS: 'Juego de Manos',
    SIGILO: 'Sigilo',

    ARCANO: 'Arcano',
    HISTORIA: 'Historia',
    INVESTIGACION: 'Investigación',
    NATURALEZA: 'Naturaleza',
    RELIGION: 'Religión',

    TRATO_DE_ANIMALES: 'Trato de animales',
    MEDICINA: 'Medicina',
    PERCEPCION: 'Percepción',
    PERSPICACIA: 'Perspicacia',
    SUPERVIVENCIA: 'Supervivencia',

    ENGAÑO: 'Engaño',
    INTIMIDACION: 'Intimidación',
    INTERPRETACION: 'Interpretación',
    PERSUASION: 'Persuasión'
}

class Caracteristica{
    constructor(nombre,puntuacion){
        this.nombre = nombre;
        this.setPuntuacion(puntuacion);
    }

    getNombre(){
        return this.nombre;
    }

    setPuntuacion(puntuacion){
        if(puntuacion > 30)
            this.puntuacion = 30;
        else if(puntuacion < 1)
            this.puntuacion = 1;
        else
            this.puntuacion = Math.floor(puntuacion);

        this.calcularModificador();
    }

    getPuntuacion(){
        return this.puntuacion;
    }

    calcularModificador(){
        this.modificador = Math.floor((this.puntuacion - 10)/2);
    }

    getModificador(){
        return this.modificador;
    }
}

class Habilidad{
    constructor(nombre, caracteristica, bonificador){
        this.nombre = nombre;
        this.caracteristica = caracteristica;
        this.bonificador = bonificador;
    }

    setBonificador(bonificador){
        this.isBonificador = bonificador;
    }

    getModificador(){
        if(this.isBonificador){
            return this.caracteristica.getModificador() + this.bonificador.getBono();
        }else
            return this.caracteristica.getModificador();
    }
}

class Bonificador{
    constructor(bono){
        this.setBono(bono);
    }

    setBono(bono){
        if(bono > 6)
            this.bono = 6;
        else if(bono < 2)
            this.bono = 2;
        else
            this.bono = Math.floor(bono);
    }

    getBono(){
        return this.bono;
    }
}


class Objeto {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    texto() {
        let texto = "<dt>" + this.nombre + "</dt>";
        texto += "<dd>Descripcion: " + this.descripcion + "</dd>";
        return texto;
    }

    xml() {
        let xml = '<objeto nombre="' + this.nombre + '">';
        xml += "<descripcion>" + this.descripcion + "</descripcion>";
        xml += "</objeto>";
        return xml;
    }
}

class Inventario {
    constructor(objetos) {
        this.objetos = objetos;
    }

    texto() {
        let texto = "<section>";

        texto += "<h4>Inventario</h4>";
        for (let i = 0; i < this.objetos.length; i++) {
            texto += this.objetos[i].texto();
        }
        texto += "</section>";
        return texto;
    }

    xml() {
        let xml = "<inventario>";
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
        let texto = "<section>";
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
        let xml = "<magias>";
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
        let texto = "<section>";
        texto += "<p>Nivel: " + this.nivel + "</p> <p>Usos: " + this.usos + "</p>";
        texto += "<h5>Magias:</h5>";
        for (let i = 0; i < this.magias.length; i++) {
            texto += this.magias[i].texto();
        }
        texto += "</section>";
        return texto;
    }

    xml() {
        let xml = '<nivelMagia n="' + this.nivel + '">';
        xml += "<usos>" + this.usos + "</usos>";
        this.magias.forEach((magia) => {
            xml += magia.xml();
        });
        xml += "</nivelMagia>";

        return xml;
    }
}

class Magia {
    constructor(nombre, descripcion, componentes) {
        this.nombre = nombre;
        this.descripcion = descripcion;

        this.componentes = componentes;

    }

    texto() {
        let texto = "<h6>" + this.nombre + "</h6>";
        texto += "<p> Descripcion: " + this.descripcion + "</p>";
        texto += "<p> Componentes: " + this.componentes + "</p>";
        return texto;
    }

    xml() {
        let xml = '<magia nombre="' + this.nombre + '">';
        xml += "<descripcion>" + this.descripcion + "</descripcion>";
        xml += "<componentes>" + this.componentes + "</componentes>";
        xml += "</magia>";

        return xml;
    }
}
