let timer;
let isRunning = false;
let elapsedTime = 0;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    hoursDisplay.textContent = String(hours).padStart(2, '0');
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;

    timer = setInterval(() => {
        elapsedTime++;
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay();
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapsList.innerHTML = '';
}

function recordLap() {
    const lapTime = `${hoursDisplay.textContent}:${minutesDisplay.textContent}:${secondsDisplay.textContent}`;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(li);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
