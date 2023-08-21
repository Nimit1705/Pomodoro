let remainingTime = 0;
let then 

const buttons = document.querySelectorAll('[data-time]');

const start = document.querySelector(".start");
const reset = document.querySelector(".reset");

const pomTimer = document.querySelector(".pomodoro-timer");

alarmSound = new Audio("./assets/blips.mp3");

let countdown;
let secondsTime = 1500;
let isPaused = false;

let pomodoroCount = 0;
let shortBreakCount = 0;
let longBreakCount = 0;

function timer(seconds){
    clearInterval(countdown);
    if(isPaused) return;
    const now = Date.now();
    then = now + seconds * 1000;
    displaySeconds(seconds);

    countdown = setInterval(() => {  
        if(isPaused) return;
        const secondsLeft = Math.round((then - Date.now())/ 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            if(secondsTime === 1500) {
                pomodoroCount++;
                console.log("pomodoro: " + pomodoroCount);
            } else if(secondsTime === 300) {
                shortBreakCount++;
                console.log("Short Break: " + shortBreakCount);
            } else if(secondsTime === 600) {
                longBreakCount++;
                console.log("Long Break: " + longBreakCount);
            }
            resetTime();
            playAlarm();
            return;
        }
        displaySeconds(secondsLeft);

    }, 1000)
}

function playAlarm(){
    alarmSound.play();
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
    start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path> </g></svg>';
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
        timer(remainingTime);
        start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"></path> </g></svg>';
    } else{
        if(countdown){
            isPaused = true;
            remainingTime = Math.round((then - Date.now())/ 1000); 
            clearInterval(countdown)
            start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path> </g></svg>'; //start
        } else{
            timer(secondsTime);
            start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"></path> </g></svg>';
        }
    }

})

function resetTime(){
    clearInterval(countdown);
    countdown = null;
    isPaused = false;
    secondsTime = secondsTime;
    start.innerHTML = '<svg height="50" width="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"></path> </g></svg>';
    secondsTime;
    const minutes = Math.floor(secondsTime/60);
    const remainderSeconds = secondsTime%60;
    const display = `${minutes}:${remainderSeconds<10 ? '0':''}${remainderSeconds}`;
    pomTimer.innerHTML = display;
}

reset.addEventListener('click', resetTime);

// ====================================Dark-Light theme toggle====================================


let lightMode = localStorage.getItem("lightMode");  //gets the value of lightMode from the local storage
const themeToggle = document.querySelector(".theme");

const enableLightMode = () => {
    document.body.classList.add('lightmode');
    localStorage.setItem('lightMode', 'enabled');
    themeToggle.innerHTML = '<svg height="40" width="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#303030" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
};


const disableLightMode = () => {
    document.body.classList.remove('lightmode');
    localStorage.setItem('lightMode', null);
    themeToggle.innerHTML = '<svg height="40" width="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>'
};

if(lightMode === "enabled"){  //Checks the last state of the lightMode
    enableLightMode();
}


themeToggle.addEventListener('click', () => {
    lightMode = localStorage.getItem("lightMode"); //gets the value of the lightMode for every click on the toggle button
    if(lightMode !== 'enabled'){
        enableLightMode();
    }else{
        disableLightMode();
    }
});

//=====================Settings===================================

const settingsModal = document.querySelector(".setting-modal");
const openSetting = document.querySelector(".settings");
const closeSetting = document.querySelector(".close-modal")

const audioDrop = document.getElementById("audioDropdown");
const save = document.getElementById("save");

let selectedAudio = localStorage.getItem("selectedAudio");
let selectedVolume = localStorage.getItem("selectedVolume");

openSetting.addEventListener('click', () =>{
    settingsModal.showModal();
})

closeSetting.addEventListener('click', () =>{
    settingsModal.close();
})


if(selectedAudio){
    alarmSound.src = `./assets/${selectedAudio}.mp3`;
    audioDrop.value = selectedAudio;
}

if (selectedVolume) {
    alarmSound.volume = selectedVolume;
    volumeControl.value = selectedVolume;
}

audioDrop.addEventListener('change', function(){
    const selectedVal = audioDrop.value;
    alarmSound.src = `./assets/${selectedVal}.mp3`;
    alarmSound.load();
    playAlarm();
})

volumeControl.addEventListener('input', function() {
    const volume = volumeControl.value;
    alarmSound.volume = volume;
    playAlarm();
});

save.addEventListener('click', function(){
    const selectedVal = audioDrop.value;
    const volume = volumeControl.value;
    localStorage.setItem("selectedAudio", selectedVal)
    localStorage.setItem("selectedVolume", volume);
    
    alarmSound.pause();
    alarmSound.currentTime = 0;
    settingsModal.close();
})
