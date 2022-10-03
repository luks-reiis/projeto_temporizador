export default class Temporizador {
    constructor(buscar){
        buscar.innerHTML = Temporizador.getHTML();

        this.alarme = new Audio('alarme.mp3');

        this.elementos = {
            horas: buscar.querySelector(".temporizador__conteudo--horas"),
            minutos: buscar.querySelector(".temporizador__conteudo--minutos"),
            segundos: buscar.querySelector(".temporizador__conteudo--segundos"),
            controle: buscar.querySelector(".temporizador__botao--controle"),
            parar: buscar.querySelector(".temporizador__botao--parar"),
            setar: buscar.querySelector(".temporizador__botao--setar"),
            teclado: document.querySelector("body")
        };

        this.tempo_escolhido = null;
        this.segundosRestantes = 0;
        this.minutosRestantes = 0;
        this.horasRestantes = 0;
      
        this.elementos.parar.addEventListener("click", () => {
          this.parar();
        });

        this.elementos.controle.addEventListener("click", () => {
            if (this.tempo_escolhido === null) {
                this.iniciar();
            }
            else {
                this.pausar();
            }
        });

        this.elementos.teclado.addEventListener('keyup', event => {
           if(event.code === 'KeyP' || event.key === 'p'){
                this.pausar();
            }else{
                if((event.code === 'KeyI' || event.key === 'i') && (this.tempo_escolhido === null)){
                    this.iniciar();
                }
            }
        });

        this.elementos.setar.addEventListener("click", () => {
            this.parar_tocar_alarme();
            const inserirHoras = prompt("Insira a quantidade de horas do temporizador regressivo:");
            if (inserirHoras <= 99 && inserirHoras >= 0 && inserirHoras != null){
                this.horasRestantes = inserirHoras;
                this.atualizarTemporizador();
            }
            const inserirMinutos = prompt("Insira a quantidade de minutos do temporizador regressivo:");
            if (inserirMinutos < 60 && inserirMinutos >= 0 && inserirMinutos != null){
                this.minutosRestantes = inserirMinutos;
                this.atualizarTemporizador();
            }
            const inserirSegundos = prompt("Insira a quantidade de segundos do temporizador regressivo:");
            if (inserirSegundos < 60 && inserirSegundos >= 0 && inserirSegundos != null){
                this.segundosRestantes = inserirSegundos;
                this.atualizarTemporizador();
            }
        });
    }
    
    atualizarTemporizador(){
        const horas = this.horasRestantes;
        const minutos = this.minutosRestantes;
        const segundos = this.segundosRestantes;

        this.elementos.horas.textContent = horas.toString().padStart(2, "0");
        this.elementos.minutos.textContent = minutos.toString().padStart(2, "0");
        this.elementos.segundos.textContent = segundos.toString().padStart(2, "0");
    }

    atualizarControle() {
        if (this.tempo_escolhido === null) {
            this.elementos.controle.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.elementos.controle.classList.add("temporizador__botao--iniciar");
            this.elementos.controle.classList.remove("temporizador__botao--pausar");
        }

        else {
            this.elementos.controle.innerHTML = `<span class="material-icons">pause</span>`;
            this.elementos.controle.classList.add("temporizador__botao--pausar");
            this.elementos.controle.classList.remove("temporizador__botao--iniciar");
        }
    }

    iniciar() {
        if (this.segundosRestantes == 0 && this.minutosRestantes == 0 && this.horasRestantes == 0) { return;}

        this.tempo_escolhido = setInterval(() => {
            if (this.segundosRestantes > 0) {
              this.segundosRestantes--;
              this.atualizarTemporizador();
            }
            else {
              if (this.minutosRestantes > 0) {
                this.minutosRestantes--;
                this.segundosRestantes = 59;
                this.atualizarTemporizador();
              }
              else {
                this.horasRestantes--;
                this.minutosRestantes = 59;
                this.segundosRestantes = 59;
                this.atualizarTemporizador();
              }
            }
          
            if(this.horasRestantes == 0 && this.minutosRestantes == 0 && this.segundosRestantes == 0) {
              this.pausar();
              this.tocar_alarme();
            }
        }, 1000);

        this.atualizarControle();
    }

    pausar() {
        clearInterval(this.tempo_escolhido);
        this.tempo_escolhido = null;
        this.atualizarControle();
    }

    parar() {
      this.segundosRestantes = 0;
      this.minutosRestantes = 0;
      this.horasRestantes = 0;
      this.pausar();
      this.atualizarTemporizador();
    }

    tocar_alarme() {
        this.alarme.currentTime = 1;
        this.alarme.play();
    }

    parar_tocar_alarme() {
        this.alarme.pause();
        this.alarme.currentTime = 0;
    }

    static getHTML() {
        return `
            <span class="temporizador__conteudo temporizador__conteudo--horas">00</span>
            <span class="temporizador__conteudo">:</span>
            <span class="temporizador__conteudo temporizador__conteudo--minutos">00</span>
            <span class="temporizador__conteudo">:</span>
            <span class="temporizador__conteudo temporizador__conteudo--segundos">00</span>
            <button type="button" class="temporizador__botao temporizador__botao--controle temporizador__botao--iniciar"><span class="material-icons">play_arrow</span></button>
            <button type="button" class="temporizador__botao temporizador__botao--parar"><span class="material-icons">stop</span></button>
            <button type="button" class="temporizador__botao temporizador__botao--setar"><span class="material-icons">alarm</span></button>
        `;
    }
}
