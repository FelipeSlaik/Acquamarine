//45 dias em milissegundos
const timeInterval = 45 * 24 * 60 * 60 * 1000;

//data futura inicial como o tempo atual mais 45 dias
let futureData = new Date().getTime() + timeInterval;

function startTimer (){
    const now = new Date().getTime(); //tempo atual
    const distance = futureData - now;
    
    //calculo para dias, horas, minutos e segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //Atualizar o HTML
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = addZero(hours);
    document.getElementById('minutes').textContent = addZero(minutes);
    document.getElementById('seconds').textContent = addZero(seconds);
   
    // Resetar crônometro quando zerar
    if(distance < 0){
        futureData = new Date().getTime() + timeInterval;
    }
}

//Adicionar zero a esquerda dos números menores que 10
function addZero(number){
    return number < 10 ? '0' + number : number;
}

//Atualizar crônometro a cada 1s
setInterval(startTimer, 1000);


