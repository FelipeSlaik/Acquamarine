//45 dias em milissegundos
const timeInterval = 45 * 24 * 60 * 60 * 1000;

//data futura inicial como o tempo atual mais 45 dias
let futureData = new Date().getTime() + timeInterval;

function startTimer() {
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
    if (distance < 0) {
        futureData = new Date().getTime() + timeInterval;
    }
}

//Adicionar zero a esquerda dos números menores que 10
function addZero(number) {
    return number < 10 ? '0' + number : number;
}

//Atualizar crônometro a cada 1s
setInterval(startTimer, 1000);

// validação do email
//Previne envio do email
document.querySelector('.user-email').addEventListener('submit', function (event) {
    event.preventDefault();


    const emailInput = document.getElementById('email').value;
    const message = document.getElementById('message');

    if (validateEmail(emailInput)) {
        message.textContent = 'E-mail enviado com sucesso!'
        message.style.color = '#008000';
        message.style.display = 'block';

        sendEmail(emailInput); // Enviar o email se tudo estiver certo
    }
    else {
        message.textContent = 'E-mail inválido. Verifique e tente novamente.'
        message.style.color = '#FF0000';
        message.style.display = 'block';
        return
    }
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// enviar Email 

async function sendEmail(emailInput) {
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
    const serviceID = process.env.SERVICE_ID;
    const templateID = process.env.TEMPLATE_ID;
    const userID = process.env.USER_ID;

    const params = {
        email: emailInput,
        reply_to: emailInput,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: userID,
                template_params: params,
            }),
        });

        if (response.ok) {
            console.log('E-mail enviado com sucesso!');
    
        } else {
            console.error('Falha ao enviar o e-mail:', response.statusText);
            
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}