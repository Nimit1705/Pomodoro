
const buttons = document.querySelectorAll('[data-time]');

const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

const pomTimer = document.querySelector(".pomodoro-timer")

let countdown;
let secondsTime = 1500;
let isPaused = false;

function timer(seconds){
    clearInterval(countdown);
    if(isPaused) return;
    const now = Date.now();
    const then = now + seconds * 1000;
    displaySeconds(seconds);

    countdown = setInterval(() => {
        if(isPaused) return;
        const secondsLeft = Math.round((then - Date.now())/ 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        displaySeconds(secondsLeft);

    }, 1000)
}



function displaySeconds(seconds){
    const minutes = Math.floor(seconds/60);
    const remainderSeconds = seconds%60;
    const display = `${minutes}:${remainderSeconds<10 ? '0':''}${remainderSeconds}`;
    pomTimer.innerHTML = display;
}


function setTime(){
    clearInterval(countdown);
    countdown = null;
    isPaused = false;
    start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#f3f2f2"></path> </g></svg>';
    secondsTime = parseInt(this.dataset.time);
    const minutes = Math.floor(secondsTime/60);
    const remainderSeconds = secondsTime%60;
    const display = `${minutes}:${remainderSeconds<10 ? '0':''}${remainderSeconds}`;
    pomTimer.innerHTML = display;
}

buttons.forEach(button => {
    button.addEventListener('click', function() {
        setTime.call(this);
        buttons.forEach(btn => btn.classList.remove('active')); 
        this.classList.add('active');
    });
});

start.addEventListener('click', function(){
    if(isPaused){
        isPaused = false;
        start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#f3f2f2"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#f3f2f2"></path> </g></svg>';
    } else{
        if(countdown){
            isPaused = true;
            start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#f3f2f2"></path> </g></svg>'; //start
        } else{
            timer(secondsTime);
            start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" fill="#f3f2f2"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" fill="#f3f2f2"></path> </g></svg>';
        }
    }

})

function resetTime(){
    clearInterval(countdown);
    countdown = null;
    isPaused = false;
    secondsTime = secondsTime;
    start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z" fill="#f3f2f2"></path> </g></svg>';
    secondsTime;
    const minutes = Math.floor(secondsTime/60);
    const remainderSeconds = secondsTime%60;
    const display = `${minutes}:${remainderSeconds<10 ? '0':''}${remainderSeconds}`;
    pomTimer.innerHTML = display;
}

reset.addEventListener('click', resetTime);