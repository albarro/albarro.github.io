"use strict";

class Personaje {
    constructor() {
        this.registros = [];
    }

    addRegistro(registro){
        this.registros.push(registro);
    }

    toString(){
        let texto = 'Personaje \n';
        for (const registro of this.registros) {
            texto += registro.toString() + "\n";
        }

        return texto;
    }
    //TODO Los campos no deberian usar el nombre sino una etiqueta
    toXml(){
        let xml = "<personaje>";
        for (const registro of this.registros) {
            xml += registro.toXml();
        }
        xml += "</personaje>";

        return xml;
    }

}

const registros ={
    NOMBRE: {TEXTO:'Nombre del personaje',ID:'nombre'},
    CLASE: {TEXTO:'Clase',ID:'clase'},
    NIVEL: {TEXTO:'Nivel',ID:'nivel'},
    TRASFONDO: {TEXTO:'Trasfondo',ID:'trasfondo'},
    NOMBRE_JUGADOR: {TEXTO:'Nombre del jugador',ID:'nombre_jugador'},
    RAZA: {TEXTO:'Raza',ID:'raza'},
    ALINEAMIENTO: {TEXTO:'Alineamiento',ID:'alineamiento'},
    EXPERIENCIA:  {TEXTO:'Experiencia',ID:'experiencia'}
}


class RegistroTexto{
    constructor(registro, contenido) {
        this.nombre = registro.TEXTO;
        this.etiqueta = registro.ID;
        this.contenido = contenido;
    }

    toString(){
        return "" + this.nombre + ": " + this.contenido;
    }

    toXml(){
        return "<" + this.etiqueta + ">" + this.contenido + "</" + this.etiqueta + ">";
    }
}

class Caracteristicas {
    constructor(fuerzaPunt, destrezaPunt, constitucionPunt, inteligenciaPunt,
                sabiduriaPunt, carismaPunt, bonificador, habilidades) {
        this.fuerza = new RegistroCaracterística(caracts.FUERZA, fuerzaPunt);
        this.destreza = new RegistroCaracterística(caracts.DESTREZA, destrezaPunt);
        this.constitucion = new RegistroCaracterística(caracts.CONSTITUCION, constitucionPunt);
        this.inteligencia = new RegistroCaracterística(caracts.INTELIGENCIA, inteligenciaPunt);
        this.sabiduria = new RegistroCaracterística(caracts.SABIDURIA, sabiduriaPunt);
        this.carisma = new RegistroCaracterística(caracts.CARISMA, carismaPunt);

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

class RegistroCaracterística{
    constructor(nombre,puntuación){
        this.nombre = nombre;
        this.setPuntuacion(puntuación);

        this.habilidades = [];
    }

    addHabilidad(habilidad){
        this.habilidades.push(habilidad);
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

class PercepcionPasiva extends Habilidad{
    constructor(sabiduria){
        super('Percepcion pasiva',sabiduria, null);
    }

    getModificador(){
        return this.caracteristica.getModificador() + 10;
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


