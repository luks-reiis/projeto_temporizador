var alarme = new Audio ("alarme4.mp3");

var horas_html = document.querySelector(".temporizador__conteudo--horas");

var minutos_html = document.querySelector(".temporizador__conteudo--minutos");

var segundos_html = document.querySelector(".temporizador__conteudo--segundos");

var controle = document.querySelector(".temporizador__botao--controle");

var parar = document.querySelector(".temporizador__botao--parar");

var setar = document.querySelector(".temporizador__botao--setar");

var teclado = document.querySelector("body");

var tempo_escolhido = null;
var segundosRestantes = 0;
var minutosRestantes = 0;
var horasRestantes = 0;

parar.addEventListener("click", () => {
    parar();
});

controle.addEventListener("click", () => {
    if (tempo_escolhido === null) {
        iniciar();
    }else {
        pausar();
    }
});

teclado.addEventListener("keyup", event => {
    if(event.code === 'KeyP' || event.key === "p"){
        pausar();
    }else{
        if((event.code === 'KeyI' || event.key === 'i') && (tempo_escolhido === null)){
            iniciar();
        }
    }
});

setar.addEventListener("click", () => {
    parar_tocar_alarme();
    const inserirHoras = prompt("Insira a quantidade de horas do temporizador regressivo:");
    if (inserirHoras <= 99 && inserirHoras >= 0 && inserirHoras != null){
        horasRestantes = inserirHoras;
        atualizarTemporizador();
    }
    const inserirMinutos = prompt("Insira a quantidade de minutos do temporizador regressivo:");
    if (inserirMinutos < 60 && inserirMinutos >= 0 && inserirMinutos != null){
        minutosRestantes = inserirMinutos;
        atualizarTemporizador();
    }
    const inserirSegundos = prompt("Insira a quantidade de segundos do temporizador regressivo:");
    if (inserirSegundos < 60 && inserirSegundos >= 0 && inserirSegundos != null){
        segundosRestantes = inserirSegundos;
        atualizarTemporizador();
    }
});

function atualizarTemporizador(){
    const horas = horasRestantes;
    const minutos = minutosRestantes;
    const segundos = segundosRestantes;

    horas_html.textContent = horas.toString().padStart(2, "0");
    minutos_html.textContent = minutos.toString().padStart(2, "0");
    segundos_html.textContent = segundos.toString().padStart(2, "0");
}

function atualizarControle() {
    if (tempo_escolhido === null) {
        controle.innerHTML = `<span class="material-icons">play_arrow</span>`;
        controle.classList.add("temporizador__botao--iniciar")
        controle.classList.remove("temporizador__botao--pausar");
    }else {
        controle.innerHTML = `<span class="material-icons">pause</span>`;
        controle.classList.add("temporizador__botao--pausar");
        controle.classList.remove("temporizador__botao--iniciar");
    }
}

function iniciar() {
    if (segundosRestantes == 0 && minutosRestantes == 0 && horasRestantes == 0) {
        return;
    }

    tempo_escolhido = setInterval(() => {
        if (segundosRestantes > 0) {
            segundosRestantes--;
            atualizarTemporizador();
        }else {
            if (minutosRestantes > 0) {
                minutosRestantes--;
                segundosRestantes = 59;
                atualizarTemporizador();
            }else {
                horasRestantes--;
                minutosRestantes = 59;
                segundosRestantes = 59;
                atualizarTemporizador();
            }
        }

        if(horasRestantes == 0 && minutosRestantes == 0 && segundosRestantes == 0) {
            pausar();
            tocar_alarme();
        }
    }, 1000);

    atualizarControle();
}

function pausar() {
    clearInterval(tempo_escolhido);
    tempo_escolhido = null;
    atualizarControle();
}

function parar() {
    segundosRestantes = 0;
    minutosRestantes = 0;
    horasRestantes = 0;
    pausar();
    atualizarTemporizador();
}

function tocar_alarme() {
    alarme.currentTime = 1;
    alarme.play();
}

function parar_tocar_alarme() {
    alarme.pause();
    alarme.currentTime = 0;
}