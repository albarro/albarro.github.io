class Generador {
    constructor() {

        this.nilsMags = 1;
        this.magias = [[]];

        this.numImgObj = 0;
        this.objetos = [];
    }


    validar() {
        let datos = $("form").serializeArray();

        let campos = [];
        datos.forEach((dato) => {
            campos[dato.name] = dato.value;
        });

        let nombre = campos.nombre;
        let raza = campos.raza;
        let descripcion = campos.descripcion;
        let transfondo = campos.transfondo;
        let alinemiento = campos.alinemiento;

        let vida = campos.vida;
        let movimiento = campos.movimiento;

        let nivel = campos.nivel;
        let clase = campos.clase;
        let experiencia = campos.experiencia;

        let fuerza = campos.fuerza;
        let destreza = campos.destreza;
        let constitucion = campos.constitucion;
        let inteligencia = campos.inteligencia;
        let sabiduria = campos.sabiduria;
        let carisma = campos.carisma;
        let atributos = new Atributos(
            fuerza,
            destreza,
            constitucion,
            inteligencia,
            sabiduria,
            carisma
        );

        let bonificador = campos.bonificador;
        let salvaciones = [];
        if (campos.atributofuerza != null) salvaciones.push('Fuerza');
        if (campos.atributodestreza != null) salvaciones.push('Destreza');
        if (campos.atributoconstitucion != null) salvaciones.push('Constitucion');
        if (campos.atributointeligencia != null) salvaciones.push('Inteligencia');
        if (campos.atributosabiduria != null) salvaciones.push('Sabiduria');
        if (campos.atributocarisma != null) salvaciones.push('Carisma');

        let idiomas = [];
        datos.forEach((dato) => {
            if (dato.name == "idioma") {
                idiomas.push(dato.value);
            }
        });

        let competencias = new Competencias(bonificador, salvaciones, idiomas);

        let inventario = new Inventario(this.objetos);

        let niveles = [];
        let niv;
        let usos;
        for (let i = 1; i < this.magias.length; i++) {
            niv = campos['nivel' + i];
            usos = campos['usosNiv' + i];
            niveles.push(new NivelMagia(niv, usos, this.magias[i]))
        }

        let atrMag = campos.atrMag;
        let salMag = campos.salMag;
        let bofMag = campos.bofMag;

        let magias = new Magias(atrMag, salMag, bofMag, niveles);

        let referencias = null;
        if (campos.referencia) {
            referencias = [];
            datos.forEach((dato) => {
                if (dato.name == "referencia") {
                    referencias.push(dato.value);
                }
            });
        }
        let autor = null;
        if (campos.autor) autor = campos["autor"];

        if (event.returnValue) {
            this.cargarDatos(
                new Personaje(
                    nombre,
                    raza,
                    descripcion,
                    transfondo,
                    alinemiento,
                    vida,
                    movimiento,
                    nivel,
                    clase,
                    experiencia,
                    atributos,
                    competencias,
                    inventario,
                    magias
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

        let datos = $("form").serializeArray();

        let campos = [];
        datos.forEach((dato) => {
            campos[dato.name] = dato.value;
        });

        let nom = campos.nombreObj;
        if (nom == "") {
            alert('El objeto necesita un nombre');
            return;
        }
        let des = campos.descripcionObj;
        if (des == "") {
            alert('El objeto necesita una descripcion');
            return;
        }

        let ref = null;
        let imgs = null;
        let vid = null;
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

        let obj = new Objeto(nom, des, ref, imgs, vid)
        this.objetos.push(obj);

        $("#inventario").show();

        $("#inventario").after(
            '<section id="' + nom + '">' +
            '<br>' + obj.texto() + '</br>' +
            '<p><input type="button" onclick="generador.borrarObjeto(\'' + nom + '\')" value="Borrar objeto"></p>' +
            "</section>"
        );

        $("#creacionObjeto").remove();
    }

    borrarObjeto(obj) {
        for (let i = 0; i < this.objetos.length; i++) {
            if (this.objetos[i] == obj)
                array.splice(i, 1);
            $("#" + obj).remove();
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
            "<section><p>Nivel " + (this.nilsMags) + "</p>" +
            '<input type="hidden" name="nivel' + this.nilsMags + '" value="' + this.nilsMags + '">' +
            '<p>Usos</p><p><input type="text" name="usosNiv' + this.nilsMags + '"></p>' +
            '<p><input type="button" onclick="generador.añadirMagia(' + this.nilsMags +
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
            '<p><input type="button" onclick="generador.crearMagia(' + niv + ')" value="Crear Magia"></p>' +
            '</section>'
        );
        $("#nivMag").hide();

    }

    crearMagia(niv) {
        this.numImgMag = 0;

        let datos = $("form").serializeArray();

        let campos = [];
        datos.forEach((dato) => {
            campos[dato.name] = dato.value;
        });

        let nom = campos.nomMag;
        if (nom == "") {
            alert('La magia necesita un nombre');
            return;
        }
        let des = campos.desMag;
        if (des == "") {
            alert('La magia necesita una descripcion');
            return;
        }
        let com = campos.comMag;
        if (com == "") {
            alert('La magia necesita componentes');
            return;
        }

        let ref = null;
        let imgs = null;
        let vid = null;
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

        let magia = new Magia(nom, des, com, ref, imgs, vid);
        this.magias[niv].push(magia);

        $("#nivMag").show();

        $("#nivMag").after(
            '<section id="Mag' + nom + '">' +
            '<br>' + magia.texto() + '</br>' +
            '<p><input type="button" onclick="generador.borrarMagia(\'Mag' + nom + '\')" value="Borrar magia"></p>' +
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
        let file = new Blob([personaje.xml()], {type: "text/xml"});

        let a = document.createElement("a"),
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

class CampoBono{
    constructor(campo, bono){
        this.campo = campo;
        this.bono = bono;

        this.camposHa = [];

        let clase = this;
        this.campo.addEventListener('change', function (e) {
            clase.actualizar(e.target.value);
        });
    }

    addCampoHabilidad(campoHabilidad){
        this.camposHa.push(campoHabilidad);
    }

    actualizar(valor){

        console.log('Cambio valor bonificador ' + valor);

        this.bono.setBono(valor);

        console.log('Nuevo valor ' + this.bono.getBono());

        this.campo.value = this.bono.getBono();

        for(let campo of this.camposHa){
            campo.actualizar(valor);
        }
    }
}

class CampoCaract{
    constructor(campo, campoMod, caract){
        this.campo = campo;
        this.campoMod = campoMod;
        this.caract = caract;

        this.camposHa = [];

        let clase = this;
        this.campo.addEventListener('change', function (e) {
            clase.actualizar(e.target.value);
        });
    }



    addCampoHabilidad(campoHabilidad){
        this.camposHa.push(campoHabilidad);
    }

    actualizar(valor){

        console.log('Cambio valor de ' + this.caract.getNombre() + ' ' + valor);

        this.caract.setPuntuacion(valor);
        this.campo.value = this.caract.getPuntuacion();
        this.campoMod.textContent = this.caract.getModificador();

        console.log('Nuevo valor ' + this.caract.getPuntuacion() + ' / ' + this.caract.getModificador());

        for(let campo of this.camposHa){
            campo.actualizar(valor);
        }
    }
}

class CampoHabil{
    constructor(campo, campoComp, habil){
        this.campo = campo;
        this.campoComp = campoComp;
        this.habil = habil;

        let clase = this;
        this.campo.addEventListener('change', function (e) {
            clase.actualizar(e.target.value);
        });

        this.campoComp.addEventListener('change', function (e) {
            clase.cambiarBono(e.target.checked);
        });
    }

    cambiarBono(valor){
        this.habil.setBonificador(valor);
        this.actualizar();
    }

    actualizar(valor){
        this.campo.value = this.habil.getModificador();
    }


}

console.log('Cargo js');

//Bonificador
const inBonificador = document.getElementById('bonificador');
const bonificador = new Bonificador(0);

const campoBonificador = new CampoBono(inBonificador, bonificador);

function createCampo(numero, check, nombre, caracteristica, campoHabil) {
    let campo = new CampoHabil(numero, check,
        new Habilidad(nombre, caracteristica, bonificador));
    campoHabil.addCampoHabilidad(campo);
    campoBonificador.addCampoHabilidad(campo);
}

//Fuerza
const inFuerza = document.getElementById('fuerza');
const modFuerza = document.getElementById('modFuerza');

const salFuerza = document.getElementById('salFuerza');
const salFuerzaNum = document.getElementById('salFuerzaNum');

const atletismo = document.getElementById('atletismo');
const atletismoNum = document.getElementById('atletismoNum');

const fuerza = new Caracteristica(caracts.FUERZA, 0);
const campoFuerza = new CampoCaract(inFuerza,modFuerza, fuerza);

createCampo(salFuerzaNum, salFuerza, caracts.FUERZA, fuerza, campoFuerza);
createCampo(atletismoNum, atletismo, habils.ATLETISMO, fuerza, campoFuerza);

//Destreza
const inDestreza = document.getElementById('destreza');
const modDestreza = document.getElementById('modDestreza');

const salDestreza = document.getElementById('salDestreza');
const salDestrezaNum = document.getElementById('salDestrezaNum');

const acrobacias = document.getElementById('acrobacias');
const acrobaciasNum = document.getElementById('acrobaciasNum');

const juegoManos = document.getElementById('juegoManos');
const juegoManosNum = document.getElementById('juegoManosNum');

const sigilo = document.getElementById('sigilo');
const sigiloNum = document.getElementById('sigiloNum');


const destreza = new Caracteristica(caracts.DESTREZA, 0);
const campoDestreza = new CampoCaract(inDestreza,modDestreza,destreza);

createCampo(salDestrezaNum, salDestreza, caracts.DESTREZA, destreza, campoDestreza);
createCampo(acrobaciasNum, acrobacias, habils.ACROBACIAS, destreza, campoDestreza);
createCampo(juegoManosNum, juegoManos, habils.JUEGO_DE_MANOS, destreza, campoDestreza);
createCampo(sigiloNum, sigilo, habils.SIGILO, destreza, campoDestreza);

//Constitucion
const inConstitucion = document.getElementById('constitucion');
const modConstitucion = document.getElementById('modConstitucion');

const salConstitucion = document.getElementById('salConstitucion');
const salConstitucionNum = document.getElementById('salConstitucionNum');

const constitucion = new Caracteristica(caracts.CONSTITUCION, 0);
const campoConstitucion = new CampoCaract(inConstitucion,modConstitucion,constitucion);

createCampo(salConstitucionNum, salConstitucion, caracts.CONSTITUCION, constitucion, campoConstitucion);

//Inteligencia
const inInteligencia = document.getElementById('inteligencia');
const modInteligencia = document.getElementById('modInteligencia');

const salInteligencia = document.getElementById('salInteligencia');
const salInteligenciaNum = document.getElementById('salInteligenciaNum');

const cArcano = document.getElementById('cArcano');
const cArcanoNum = document.getElementById('cArcanoNum');

const historia = document.getElementById('historia');
const historiaNum = document.getElementById('historiaNum');

const investigacion = document.getElementById('investigacion');
const investigacionNum = document.getElementById('investigacionNum');

const naturaleza = document.getElementById('naturaleza');
const naturalezaNum = document.getElementById('naturalezaNum');

const religion = document.getElementById('religion');
const religionNum = document.getElementById('religionNum');

const inteligencia = new Caracteristica(caracts.INTELIGENCIA, 0);
const campoInteligencia = new CampoCaract(inInteligencia,modInteligencia,inteligencia);

createCampo(salInteligenciaNum, salInteligencia, caracts.INTELIGENCIA, inteligencia, campoInteligencia);
createCampo(cArcanoNum, cArcano, habils.ARCANO, inteligencia, campoInteligencia);
createCampo(historiaNum, historia, habils.HISTORIA, inteligencia, campoInteligencia);
createCampo(investigacionNum, investigacion, habils.INVESTIGACION, inteligencia, campoInteligencia);
createCampo(naturalezaNum, naturaleza, habils.NATURALEZA, inteligencia, campoInteligencia);
createCampo(religionNum, religion, habils.RELIGION, inteligencia, campoInteligencia);

//Sabiduria
const inSabiduria = document.getElementById('sabiduria');
const modSabiduria = document.getElementById('modSabiduria');

const salSabiduria = document.getElementById('salSabiduria');
const salSabiduriaNum = document.getElementById('salSabiduriaNum');

const tAnimales = document.getElementById('tAnimales');
const tAnimalesNum = document.getElementById('tAnimalesNum');

const medicina = document.getElementById('medicina');
const medicinaNum = document.getElementById('medicinaNum');

const percepcion = document.getElementById('percepcion');
const percepcionNum = document.getElementById('percepcionNum');

const perspicacia = document.getElementById('perspicacia');
const perspicaciaNum = document.getElementById('perspicaciaNum');

const supervivencia = document.getElementById('supervivencia');
const supervivenciaNum = document.getElementById('supervivenciaNum');

const sabiduria = new Caracteristica(caracts.SABIDURIA, 0);
const campoSabiduria = new CampoCaract(inSabiduria,modSabiduria,sabiduria);

createCampo(salSabiduriaNum, salSabiduria, caracts.SABIDURIA, sabiduria, campoSabiduria);
createCampo(tAnimalesNum, tAnimales, habils.TRATO_DE_ANIMALES, sabiduria, campoSabiduria);
createCampo(medicinaNum, medicina, habils.MEDICINA, sabiduria, campoSabiduria);
createCampo(percepcionNum, percepcion, habils.PERCEPCION, sabiduria, campoSabiduria);
createCampo(perspicaciaNum, perspicacia, habils.PERSPICACIA, sabiduria, campoSabiduria);
createCampo(supervivenciaNum, supervivencia, habils.SUPERVIVENCIA, sabiduria, campoSabiduria);

//Carisma
const inCarisma = document.getElementById('carisma');
const modCarisma = document.getElementById('modCarisma');

const salCarisma = document.getElementById('salCarisma');
const salCarismaNum = document.getElementById('salCarismaNum');

const engaño = document.getElementById('engaño');
const engañoNum = document.getElementById('engañoNum');

const intimidacion = document.getElementById('intimidacion');
const intimidacionNum = document.getElementById('intimidacionNum');

const interpretacion = document.getElementById('interpretacion');
const interpretacionNum = document.getElementById('interpretacionNum');

const persuasion = document.getElementById('persuasion');
const persuasionNum = document.getElementById('persuasionNum');

const carisma = new Caracteristica(caracts.CARISMA, 0);
const campoCarisma = new CampoCaract(inCarisma,modCarisma,carisma);

createCampo(salCarismaNum, salCarisma, caracts.CARISMA, carisma, campoCarisma);
createCampo(engañoNum, engaño, habils.ENGAÑO, carisma, campoCarisma);
createCampo(intimidacionNum, intimidacion, habils.INTIMIDACION, carisma, campoCarisma);
createCampo(interpretacionNum, interpretacion, habils.INTERPRETACION, carisma, campoCarisma);
createCampo(persuasionNum, persuasion, habils.PERSUASION, carisma, campoCarisma);




