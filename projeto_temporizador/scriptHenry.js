import iniciar from "./Temporizador"

window.addEventListener('keyup', event => {
    console.log(event.code, event.key)

    if(event.code === 'KeyP' || event.key === 'p'){
        console.log('Deu Certo')
    }else{
        console.log('Não deu certo')
    }
})