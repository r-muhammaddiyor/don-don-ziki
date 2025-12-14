import {
  elAi,
  elGameZone,
  elHands,
  elRefreshGameButton,
  elResultZone,
  elUser,
} from './html-elements.js';

// AI choose

function aiChoose() {
  const hands = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.trunc(Math.random() * hands.length);
  return hands[randomIndex];
}

// swapZone

function swapZone(showResult) {
  if (showResult) {
    elGameZone.classList.add('hidden');
    elResultZone.classList.remove('hidden');
  } else {
    elGameZone.classList.remove('hidden');
    elResultZone.classList.add('hidden');
  }
}

// Find winner

function checkWinner(user, ai) {
  if(user === ai) {
    return "TIE"
  } else if(user === "paper" && ai === "scissors") {
    return "ROBOT";
  } else if (user === 'scissors' && ai === 'rock') {
    return 'ROBOT';
  } else if (user === 'rock' && ai === 'paper') {
    return 'ROBOT';
  } else {
    return "USER"
  }
}


elResultZone.classList.add('hidden');

elHands.forEach((elHand) => {
  elHand.addEventListener('click', (evt) => {
    swapZone(true);
    const user = evt.target.alt;
    const ai = aiChoose();

    elUser.src = evt.target.src;
    elAi.src = './images/choosing.svg';
    setTimeout(() => {
      elAi.src = `./images/${ai}.svg`;
      const winner = checkWinner(user, ai)
      console.log(winner);
    }, 1000);
  });
});

// Refresh game

elRefreshGameButton.addEventListener('click', () => {
  swapZone(false);
});
