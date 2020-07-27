class Dado {
  constructor() {}

  async tirarDado(dado) {
    $("#resultadoDados").text('');
    var tirada = Math.floor(Math.random() * (dado) + 1);
    await sleep(50);
    $("#resultadoDados").text('Resultado: ' + tirada);
  }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

var dado = new Dado();
