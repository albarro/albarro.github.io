class CampoBonoHtml {
    constructor(campo, bono) {
        this.campo = campo;
        this.bono = bono;

        this.camposHa = [];

        let clase = this;
        this.campo.addEventListener('change', function (e) {
            clase.actualizar(e.target.value);
        });
    }

    getValor() {
        return this.campo.value;
    }

    iniciar() {
        if (!this.getValor())
            this.actualizar(2);
        else
            this.actualizar(this.getValor());
    }

    addCampoHabilidad(campoHabilidad) {
        this.camposHa.push(campoHabilidad);
    }

    actualizar(valor) {

        console.log('Cambio valor bonificador ' + valor);

        this.bono.setBono(valor);

        console.log('Nuevo valor ' + this.bono.getBono());

        this.campo.value = this.bono.getBono();

        for (let campo of this.camposHa) {
            campo.actualizar(valor);
        }
    }
}

class CampoCaractHtml {
    constructor(campo, campoMod, caract) {
        this.campo = campo;
        this.campoMod = campoMod;
        this.caract = caract;

        this.camposHa = [];

        let clase = this;
        this.campo.addEventListener('change', function (e) {
            clase.actualizar(e.target.value);
        });
    }

    getValor() {
        return this.campo.value;
    }

    iniciar() {
        if (!this.getValor())
            this.actualizar(10);
        else
            this.actualizar(this.getValor());
    }

    addCampoHabilidad(campoHabilidad) {
        this.camposHa.push(campoHabilidad);
    }

    actualizar(valor) {

        console.log('Cambio valor de ' + this.caract.getNombre() + ' ' + valor);

        this.caract.setPuntuacion(valor);
        this.campo.value = this.caract.getPuntuacion();
        this.campoMod.textContent = this.caract.getModificador();

        console.log('Nuevo valor ' + this.caract.getPuntuacion() + ' / ' + this.caract.getModificador());

        for (let campo of this.camposHa) {
            campo.actualizar(valor);
        }
    }
}

class CampoHabilHtml {
    constructor(campo, campoComp, habil) {
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

    cambiarBono(valor) {
        this.habil.setBonificador(valor);
        this.actualizar();
    }

    actualizar() {
        this.campo.value = this.habil.getModificador();
    }
}

class CampoPercepcionPasiva {
    constructor(campo, percepPas) {
        this.campo = campo;
        this.percepPas = percepPas;

        let clase = this;
        this.campo.addEventListener('change', function (e) {
            clase.actualizar(e.target.value);
        });
    }

    actualizar() {
        this.campo.value = this.percepPas.getModificador();
    }
}

function createCampo(numero, check, nombre, caracteristica, campoCaract) {
    let campo = new CampoHabilHtml(numero, check,
        new Habilidad(nombre, caracteristica, bonificador));
    campoCaract.addCampoHabilidad(campo);
    campoBonificador.addCampoHabilidad(campo);
}

function createCampoPercepcionPas(numero, caracteristica, campoHabil) {
    let campo = new CampoPercepcionPasiva(numero,new PercepcionPasiva(caracteristica));
    campoHabil.addCampoHabilidad(campo);
}

console.log('Cargo js');

//Caracteristicas Basicas
const nombre = document.getElementById('nombre');

const clase = document.getElementById('nombre');
const nivel = document.getElementById('nivel');
const trasfondo = document.getElementById('trasfondo');
const nombreJugador = document.getElementById('nombreJugador');

const raza = document.getElementById('raza');
const alineamiento = document.getElementById('alineamiento');
const experiencia = document.getElementById('experiencia');


//Bonificador
const inBonificador = document.getElementById('bonificador');
const bonificador = new Bonificador(0);

const campoBonificador = new CampoBonoHtml(inBonificador, bonificador);
campoBonificador.iniciar();

//Fuerza
const inFuerza = document.getElementById('fuerza');
const modFuerza = document.getElementById('modFuerza');

const fuerza = new RegistroCaracterística(caracts.FUERZA, 0);
const campoFuerza = new CampoCaractHtml(inFuerza, modFuerza, fuerza);

const salFuerza = document.getElementById('salFuerza');
const salFuerzaNum = document.getElementById('salFuerzaNum');

const atletismo = document.getElementById('atletismo');
const atletismoNum = document.getElementById('atletismoNum');

createCampo(salFuerzaNum, salFuerza, caracts.FUERZA, fuerza, campoFuerza);
createCampo(atletismoNum, atletismo, habils.ATLETISMO, fuerza, campoFuerza);

campoFuerza.iniciar();

//Destreza
const inDestreza = document.getElementById('destreza');
const modDestreza = document.getElementById('modDestreza');

const destreza = new RegistroCaracterística(caracts.DESTREZA, 0);
const campoDestreza = new CampoCaractHtml(inDestreza, modDestreza, destreza);

const salDestreza = document.getElementById('salDestreza');
const salDestrezaNum = document.getElementById('salDestrezaNum');

const acrobacias = document.getElementById('acrobacias');
const acrobaciasNum = document.getElementById('acrobaciasNum');

const juegoManos = document.getElementById('juegoManos');
const juegoManosNum = document.getElementById('juegoManosNum');

const sigilo = document.getElementById('sigilo');
const sigiloNum = document.getElementById('sigiloNum');

createCampo(salDestrezaNum, salDestreza, caracts.DESTREZA, destreza, campoDestreza);
createCampo(acrobaciasNum, acrobacias, habils.ACROBACIAS, destreza, campoDestreza);
createCampo(juegoManosNum, juegoManos, habils.JUEGO_DE_MANOS, destreza, campoDestreza);
createCampo(sigiloNum, sigilo, habils.SIGILO, destreza, campoDestreza);

campoDestreza.iniciar();

//Constitucion
const inConstitucion = document.getElementById('constitucion');
const modConstitucion = document.getElementById('modConstitucion');

const constitucion = new RegistroCaracterística(caracts.CONSTITUCION, 0);
const campoConstitucion = new CampoCaractHtml(inConstitucion, modConstitucion, constitucion);

const salConstitucion = document.getElementById('salConstitucion');
const salConstitucionNum = document.getElementById('salConstitucionNum');

createCampo(salConstitucionNum, salConstitucion, caracts.CONSTITUCION, constitucion, campoConstitucion);

campoConstitucion.iniciar();

//Inteligencia
const inInteligencia = document.getElementById('inteligencia');
const modInteligencia = document.getElementById('modInteligencia');

const inteligencia = new RegistroCaracterística(caracts.INTELIGENCIA, 0);
const campoInteligencia = new CampoCaractHtml(inInteligencia, modInteligencia, inteligencia);

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

createCampo(salInteligenciaNum, salInteligencia, caracts.INTELIGENCIA, inteligencia, campoInteligencia);
createCampo(cArcanoNum, cArcano, habils.ARCANO, inteligencia, campoInteligencia);
createCampo(historiaNum, historia, habils.HISTORIA, inteligencia, campoInteligencia);
createCampo(investigacionNum, investigacion, habils.INVESTIGACION, inteligencia, campoInteligencia);
createCampo(naturalezaNum, naturaleza, habils.NATURALEZA, inteligencia, campoInteligencia);
createCampo(religionNum, religion, habils.RELIGION, inteligencia, campoInteligencia);

campoInteligencia.iniciar();

//Sabiduria
const inSabiduria = document.getElementById('sabiduria');
const modSabiduria = document.getElementById('modSabiduria');

const sabiduria = new RegistroCaracterística(caracts.SABIDURIA, 0);
const campoSabiduria = new CampoCaractHtml(inSabiduria, modSabiduria, sabiduria);

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

const percepcionPasNum = document.getElementById('percepcionPasNum');

createCampo(salSabiduriaNum, salSabiduria, caracts.SABIDURIA, sabiduria, campoSabiduria);
createCampo(tAnimalesNum, tAnimales, habils.TRATO_DE_ANIMALES, sabiduria, campoSabiduria);
createCampo(medicinaNum, medicina, habils.MEDICINA, sabiduria, campoSabiduria);
createCampo(percepcionNum, percepcion, habils.PERCEPCION, sabiduria, campoSabiduria);
createCampo(perspicaciaNum, perspicacia, habils.PERSPICACIA, sabiduria, campoSabiduria);
createCampo(supervivenciaNum, supervivencia, habils.SUPERVIVENCIA, sabiduria, campoSabiduria);

createCampoPercepcionPas(percepcionPasNum, sabiduria, campoSabiduria);

campoSabiduria.iniciar();

//Carisma
const inCarisma = document.getElementById('carisma');
const modCarisma = document.getElementById('modCarisma');

const carisma = new RegistroCaracterística(caracts.CARISMA, 0);
const campoCarisma = new CampoCaractHtml(inCarisma, modCarisma, carisma);

const salCarisma = document.getElementById('salCarisma');
const salCarismaNum = document.getElementById('salCarismaNum');

const engaño = document.getElementById('engaño');
const engañoNum = document.getElementById('engañoNum');

const intimidación = document.getElementById('intimidacion');
const intimidaciónNum = document.getElementById('intimidacionNum');

const interpretación = document.getElementById('interpretacion');
const interpretaciónNum = document.getElementById('interpretacionNum');

const persuasion = document.getElementById('persuasion');
const persuasionNum = document.getElementById('persuasionNum');

createCampo(salCarismaNum, salCarisma, caracts.CARISMA, carisma, campoCarisma);
createCampo(engañoNum, engaño, habils.ENGAÑO, carisma, campoCarisma);
createCampo(intimidaciónNum, intimidación, habils.INTIMIDACION, carisma, campoCarisma);
createCampo(interpretaciónNum, interpretación, habils.INTERPRETACION, carisma, campoCarisma);
createCampo(persuasionNum, persuasion, habils.PERSUASION, carisma, campoCarisma);

campoCarisma.iniciar();

function test(){

    let personaje = new Personaje();
    personaje.addRegistro(new RegistroTexto(registros.NOMBRE,nombre.value));

    personaje.addRegistro(new RegistroTexto(registros.CLASE,clase.value));
    personaje.addRegistro(new RegistroTexto(registros.NIVEL,nivel.value));
    personaje.addRegistro(new RegistroTexto(registros.TRASFONDO,trasfondo.value));
    personaje.addRegistro(new RegistroTexto(registros.NOMBRE_JUGADOR,nombreJugador.value));

    personaje.addRegistro(new RegistroTexto(registros.RAZA,raza.value));
    personaje.addRegistro(new RegistroTexto(registros.ALINEAMIENTO,alineamiento.value));
    personaje.addRegistro(new RegistroTexto(registros.EXPERIENCIA,experiencia.value));

    console.log(personaje.toString());

    save(nombre.value, personaje.toXml());
}

function save(filename, data) {
    let blob = new Blob([data], {type: 'text/xml'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        let elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
        URL.revokeObjectURL(elem.href);
    }
}