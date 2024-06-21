let playerCount = 2;
let currentPlayer = 1;
let playerResults = [];
let players = [];
let rolling = false;
let rollInterval;

document.getElementById('setPlayers').addEventListener('click', setPlayers);
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('startRoll').addEventListener('click', startRoll);
document.getElementById('stopRoll').addEventListener('click', stopRoll);
document.getElementById('nextPlayer').addEventListener('click', nextPlayer);
document.getElementById('showResults').addEventListener('click', showResults);
document.getElementById('playAgain').addEventListener('click', resetGame);

function setPlayers() {
    playerCount = parseInt(document.getElementById('playerCount').value);
    if (playerCount < 2) {
        alert('プレイヤー数は2人以上にしてください。');
        return;
    }
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('playerNames').classList.remove('hidden');
    
    const playerInputs = document.getElementById('playerInputs');
    playerInputs.innerHTML = '';
    for (let i = 1; i <= playerCount; i++) {
        playerInputs.innerHTML += `
            <div class="player-input-container">
                <input type="text" id="player${i}" placeholder="プレイヤー ${i} の名前">
            </div>
        `;
    }
}

function startGame() {
    players = [];
    for (let i = 1; i <= playerCount; i++) {
        const name = document.getElementById(`player${i}`).value || `プレイヤー ${i}`;
        players.push(name);
    }
    document.getElementById('playerNames').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    updatePlayerDisplay();
}

function startRoll() {
    rolling = true;
    document.getElementById('startRoll').classList.add('hidden');
    document.getElementById('stopRoll').classList.remove('hidden');
    rollInterval = setInterval(() => {
        const numberDisplay = document.getElementById('numberDisplay');
        numberDisplay.textContent = Math.floor(Math.random() * 100) + 1;
        numberDisplay.classList.remove('number-animation');
        void numberDisplay.offsetWidth; // トリガーリフロー
        numberDisplay.classList.add('number-animation');
    }, 100);
}

function stopRoll() {
    rolling = false;
    clearInterval(rollInterval);
    document.getElementById('stopRoll').classList.add('hidden');
    document.getElementById('nextPlayer').classList.remove('hidden');
    playerResults.push(parseInt(document.getElementById('numberDisplay').textContent));
}

function nextPlayer() {
    currentPlayer++;
    if (currentPlayer <= playerCount) {
        updatePlayerDisplay();
        document.getElementById('numberDisplay').textContent = '-';
        document.getElementById('startRoll').classList.remove('hidden');
        document.getElementById('nextPlayer').classList.add('hidden');
    } else {
        document.getElementById('game').classList.add('hidden');
        document.getElementById('showResults').classList.remove('hidden');
    }
}

function updatePlayerDisplay() {
    document.getElementById('currentPlayer').textContent = `${players[currentPlayer - 1]}の番です！`;
}

function showResults() {
    document.getElementById('showResults').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    playerResults.forEach((result, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${players[index]}</span> <span>${result}</span>`;
        resultsList.appendChild(li);
    });
}

function resetGame() {
    playerCount = 2;
    currentPlayer = 1;
    playerResults = [];
    players = [];
    document.getElementById('results').classList.add('hidden');
    document.getElementById('setup').classList.remove('hidden');
    document.getElementById('playerCount').value = '2';
}