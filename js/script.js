'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');
const btnNew = document.getElementById('btn--new');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    document.querySelector(".dice").style.display = "none";
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.add('active');
    player1El.classList.remove('active');
    player0El.classList.remove('winner');
    player1El.classList.remove('winner');
};

init();

// Switch player function
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('active');
    player1El.classList.toggle('active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generate a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice").src = `../images/dice-${dice}.png`;
        // 2. Check if rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

// Hold score functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's total score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 10) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('active');
            showFireworks();
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// New game functionality
btnNew.addEventListener('click', init);

// Function to show fireworks when a player wins
function showFireworks() {
  const fireworkOverlay = document.createElement('div');
  fireworkOverlay.classList.add('firework-overlay');
  document.body.appendChild(fireworkOverlay);
  // Generate random fireworks
  for (let i = 0; i < 100; i++) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.top = `${Math.random() * 100}vh`;
    firework.style.left = `${Math.random() * 100}vw`;
    fireworkOverlay.appendChild(firework);
  }

  fireworkOverlay.style.display = 'block';

  // Remove the firework overlay after some time
  setTimeout(() => {
    fireworkOverlay.remove();
  }, 5000);
}


function showRules(e) {
  document.querySelector(".rules").classList.remove("hidden");
  e.stopPropagation();
}

function closeRules(e) {
  console.log("one step");
  if(document.querySelector(".rules").contains(e.target) || e.target.innerHTML === "Rules") return;
  document.querySelector(".rules").classList.add("hidden");
}

document.querySelector(".link-rules").addEventListener("click", showRules);

document.body.addEventListener("click", closeRules)


document.querySelector(".menu-icon").addEventListener("click", function() {
  document.querySelector(".mobile-nav").classList.toggle("hidden")});
// Call showFireworks() when a player wins
