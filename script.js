
const buttons = document.querySelectorAll('[data-time]');

const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

const pomTimer = document.querySelector(".pomodoro-timer")

let countdown;
let secondsTime = 1500;
let isPaused = false;

function timer(seconds){
    clearInterval(countdown);

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
    start.textContent = 'Start';
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
        start.textContent = 'Pause';
    } else{
        if(countdown){
            isPaused = true;
            start.textContent = 'Start'
        } else{
            timer(secondsTime);
            start.textContent = 'Pause';
        }
    }

})

function resetTime(){
    
    clearInterval(countdown);
    secondsTime;
    const minutes = Math.floor(secondsTime/60);
    const remainderSeconds = secondsTime%60;
    const display = `${minutes}:${remainderSeconds<10 ? '0':''}${remainderSeconds}`;
    pomTimer.innerHTML = display;
}

reset.addEventListener('click', resetTime);