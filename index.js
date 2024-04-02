let isTimerActive = false

document.getElementById('start-btn').onclick = () => {
    if (isTimerActive) return
    isTimerActive = true
    const nextOffTime = getNextOffTime()
    let secondsLeft = getSecondsToNextOffTime(nextOffTime)
    document.getElementById('time-txt').textContent = getTimeStringFromSeconds(secondsLeft)

    const interval = setInterval(() => {
        secondsLeft = getSecondsToNextOffTime(nextOffTime)

        if (secondsLeft <= 0) {
            clearInterval(interval) 
            isTimerActive = false
            electron.focusWindow()
            document.getElementById('time-txt').textContent = '00:00'
        } else {
            document.getElementById('time-txt').textContent = getTimeStringFromSeconds(secondsLeft)
        }
    }, 1000)
}

function getNextOffTime() {
    const now = new Date();
    const minutes = now.getMinutes();

    let nextOffTime = new Date(now);
    nextOffTime.setSeconds(0); // Reset seconds to 0
    nextOffTime.setMilliseconds(0); // Reset milliseconds to 0

    if (minutes < 24) {
        nextOffTime.setMinutes(24);
    } else if (minutes < 54) {
        targetTime.setMinutes(54);
    } else {
        nextOffTime.setHours(now.getHours() + 1);
        nextOffTime.setMinutes(24);
    }

    return nextOffTime;
}

function getSecondsToNextOffTime(nextOffTime) {
    const now = new Date();
    const differenceInSeconds = Math.floor((nextOffTime - now) / 1000);
    return differenceInSeconds;
}

function getTimeStringFromSeconds(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0')
    const sec = (seconds % 60).toString().padStart(2, '0')
    return `${min}:${sec}`
}