let isTimerActive = false

document.getElementById('start-btn').onclick = () => {
    if (isTimerActive) return
    isTimerActive = true
    let secondsLeft = getSecondsToNextOffTime()
    document.getElementById('time-txt').textContent = getTimeStringFromSeconds(secondsLeft)

    const interval = setInterval(() => {
        secondsLeft = getSecondsToNextOffTime()
        document.getElementById('time-txt').textContent = getTimeStringFromSeconds(secondsLeft)

        if (secondsLeft <= 0) {
            clearInterval(interval) 
            isTimerActive = false
            electron.focusWindow()
        }
    }, 1000)
}

function getNextOffTime() {
    const now = new Date();
    const minutes = now.getMinutes();

    let targetTime = new Date(now);
    targetTime.setSeconds(0); // Reset seconds to 0
    targetTime.setMilliseconds(0); // Reset milliseconds to 0

    if (minutes < 24) {
        targetTime.setMinutes(24);
    } else if (minutes < 54) {
        targetTime.setMinutes(54);
    } else {
        targetTime.setHours(now.getHours() + 1);
        targetTime.setMinutes(24);
    }

    return targetTime;
}

function getSecondsToNextOffTime() {
    const nextOffTime = getNextOffTime();
    const now = new Date();
    const differenceInSeconds = Math.floor((nextOffTime - now) / 1000);
    return differenceInSeconds;
}

function getTimeStringFromSeconds(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0')
    const sec = (seconds % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
}