const inputEl = document.querySelector("input");
const guessEl = document.querySelector(".guess");
const checkBtnEl = document.querySelector(".checkBtn");
const chancesDisplayEl = document.querySelector(".chances-display");
const remainingChancesEl = document.querySelector(".chance-big");
const overlayEl = document.querySelector(".overlay");
const modeToggleEl = document.querySelector(".mode-toggle");

let randomNumber = Math.floor(Math.random() * 100) + 1;
let totalChances = 10;

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    totalChances = 10;
    inputEl.value = "";
    inputEl.disabled = false;
    guessEl.textContent = "";
    remainingChancesEl.textContent = totalChances;
    checkBtnEl.textContent = "Check";
    overlayEl.classList.remove("show");
}

function updateChancesStyle() {
    remainingChancesEl.textContent = totalChances;
}

function triggerGameOver() {
    overlayEl.classList.add("show");
    setTimeout(() => resetGame(), 2000); // Wait for 2 seconds
}

checkBtnEl.addEventListener("click", () => {
    if (totalChances === 0) {
        resetGame();
        return;
    }

    let inputValue = Number(inputEl.value);

    if (inputValue < 1 || inputValue > 100 || isNaN(inputValue)) {
        guessEl.textContent = "Invalid number! Please guess a number between 1 and 100.";
        return;
    }

    totalChances--;

    if (totalChances === 0 && inputValue !== randomNumber) {
        inputEl.disabled = true;
        triggerGameOver();
    } else if (inputValue === randomNumber) {
        guessEl.textContent = "Congratulations! You guessed it!";
        guessEl.style.color = "green";
    } else if (inputValue > randomNumber) {
        guessEl.textContent = "Too high!";
    } else {
        guessEl.textContent = "Too low!";
    }

    updateChancesStyle();
});

modeToggleEl.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    modeToggleEl.textContent =
        document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});
