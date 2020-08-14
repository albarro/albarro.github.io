"use strict";
//TODO
function parserPersonajeToHtml(personaje){
    let texto = "<section>";

    texto += "<h3>" + personaje.nombre + "</h3>";
    texto += "<p>Raza: " + personaje.raza + "</p>";
    texto += "<p>Descripcion: " + personaje.descripcion + "</p>";
    texto += "<p>Transfondo: " + personaje.transfondo + "</p>";
    texto += "<p>Alineamiento: " + personaje.alinemiento + "</p>";





    //Caracteristicas
    texto += "<section>";

    texto = "<h4>Atributos</h4>";
    texto += "<p>Fuerza: " + this.fuerza + "</p>";
    texto += "<p>Destreza: " + this.destreza + "</p>";
    texto += "<p>Constitucion: " + this.constitucion + "</p>";
    texto += "<p>Inteligencia: " + this.inteligencia + "</p>";
    texto += "<p>Sabiduria: " + this.sabiduria + "</p>";
    texto += "<p>Carisma: " + this.carisma + "</p>";

    texto += "</section>";


    texto += this.competencias.html();
    texto += this.inventario.html();
    texto += this.magias.html();


    texto += "</section>";


    return texto;
}

function ParserPersonajeToXml(Personaje){
    let xml = '<personaje nombre="' + this.nombre + '">';

    xml += "<raza>" + this.raza + "</raza>";
    xml += "<descripcion>" + this.descripcion + "</descripcion>";
    xml += "<transfondo>" + this.transfondo + "</transfondo>";
    xml += "<alinemiento>" + this.alinemiento + "</alinemiento>";

    xml += "<vida>" + this.vida + "</vida>";
    xml += "<movimiento>" + this.movimiento + "</movimiento>";

    xml += "<nivel>" + this.nivel + "</nivel>";
    xml += "<clase>" + this.clase + "</clase>";
    xml += "<experiencia>" + this.experiencia + "</experiencia>";

    //Caracteristicas
        xml += "<atributos>";
        xml += "<fuerza>" + this.fuerza + "</fuerza>";
        xml += "<destreza>" + this.destreza + "</destreza>";
        xml += "<constitucion>" + this.constitucion + "</constitucion>";
        xml += "<inteligencia>" + this.inteligencia + "</inteligencia>";
        xml += "<sabiduria>" + this.sabiduria + "</sabiduria>";
        xml += "<carisma>" + this.carisma + "</carisma>";
        xml += "</atributos>";


    xml += this.competencias.xml();
    xml += this.inventario.xml();
    xml += this.magias.xml();


    xml += "</personaje>";
    return xml;
}