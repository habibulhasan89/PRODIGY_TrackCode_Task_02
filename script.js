let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        paused = false;
    }
}

function pauseStopwatch() {
    if (running && !paused) {
        clearInterval(tInterval);
        paused = true;
    } else if (running && paused) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 1);
        paused = false;
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps = [];
    lapsContainer.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    display.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
                        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                        (seconds > 9 ? seconds : "0" + seconds);
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}
