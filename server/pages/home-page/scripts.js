import { getFrontEndUrl } from "/static/utils/utils.js";

function getRandomFourDigitNumber() {
    let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(digits);


    let firstDigitIndex = digits.indexOf(0);
    if (firstDigitIndex !== -1) {
        digits.splice(firstDigitIndex, 1);
    }

    let fourDigitNumber = parseInt(digits.slice(0, 4).join(''));

    return fourDigitNumber;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateRandomNumber() {
    document.getElementById('randomNumber').textContent = getRandomFourDigitNumber();
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateRandomNumber();
    setInterval(updateRandomNumber, 1000);
});

async function createGame (){
    console.log("here");
    const result = await fetch('http://127.0.0.1:3000/games/start', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
    const {status, gameId} = await result.json();
    if(status === 'success'){
        window.location.href = getFrontEndUrl(`game?gameId=${gameId}`);
    }

}
// window.createGame = createGame;

(async () => {
    document.addEventListener('DOMContentLoaded', (event) => {
        updateRandomNumber();
        setInterval(updateRandomNumber, 1000);
    });

    document.getElementById("play-button").addEventListener('click', (event) => {
        createGame();
    })
})();
