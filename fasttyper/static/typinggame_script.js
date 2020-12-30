const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const wpmAnnouncement = document.querySelector(".wpm-announcement");
const submitButton = document.querySelector("#submit");

let displayOriginText = document.querySelector("#origin-text");
let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;
let error = 0;
let wpm = 0;

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    // Updating 1/1000 second
    timer[3]++;
    // Minute
    timer[0] = Math.floor((timer[3] / 100) / 60);
    // Sec
    timer[1] = Math.floor((timer[3] / 100) - timer[0] * 60);
    // Mini-sec
    timer[2] = Math.floor((timer[3] - (timer[1] * 100) - timer[0] * 60 * 100));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let textEnteredLength = textEntered.length;
    let textProvidedMatch = originText.substring(0, textEnteredLength);

    wpm = ((textEnteredLength / 5) / ((timer[3] / 100) / 60)).toFixed(0);
    if (textEntered == originText) {
        clearInterval(interval);
        wpmAnnouncement.innerHTML = "Your Word per Minute (WPM) is " +
            wpm + " and you made " + error + " errors.";
        testWrapper.style.border = "7px solid black";
        populateHiddenField(wpm);

    } else {
        if (textEntered == textProvidedMatch) {
            if (textEnteredLength >= 26) {
                displayOriginText.innerHTML = "<p class=\"overflow\"><b><u>" + textEntered.substring(textEnteredLength - 25) +
                    "</u></b>" + originText.substring(textEnteredLength) + "</p>";
            } else {
                displayOriginText.innerHTML = "<p class=\"overflow\"><b><u>" + textEntered +
                    "</u></b>" + originText.substring(textEnteredLength) + "</p>";
            }
        } else {
            error += 1;
        }
    }

    wpmAnnouncement.innerHTML = "Your Word per Minute (WPM) is " +
        wpm + " and you made " + error + " errors.";

}

// Start the timer + wpm counter:
function start() {
    let textEnteredLen = testArea.value.length;
    if (textEnteredLen === 0 && !timerRunning) {
        interval = setInterval(runTimer, 10);
        timerRunning = true;
    }
}

// Stop and return wpm:
function stop() {
    clearInterval(interval);
    interval = null;
    timerRunning = false;

    testWrapper.style.border = "7px solid black";
}
// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    error = 0;
    wpm = 0;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.border = "5px solid black";
    wpmAnnouncement.innerHTML = "";
    displayOriginText.innerHTML = "<p class=\"overflow\">" + originText + "</p>";
}

// Populate player_score field
function populateHiddenField(wpm_count) {
    document.querySelector("#id_player_score").value = wpm_count;
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keydown", start, false);
testArea.addEventListener("keyup", (event) => {
        if (event.key == 'Enter') {
            stop();
        }
    },
    false);

testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);