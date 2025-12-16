import {
  elAdvansed,
  elAi,
  elBasic,
  elGameZone,
  elHands,
  elRefreshGameButton,
  elResultZone,
  elUser,
  elModeChangerButton,
  elFindWinner,
  elScore,
} from './html-elements.js';

// rules

const elRulesImage = document.querySelector('#rulesImage');


let activeMode = 'advanced';

function modeChanger() {
  if (activeMode === 'advanced') {
    activeMode = 'basic';

    elAdvansed.classList.add('hidden');
    elBasic.classList.remove('hidden');
    elBasic.classList.add('grid');
    elRulesImage.src = '../images/rule-basic.svg';

    elModeChangerButton.innerText = 'ADVANCED';
  } else {
    activeMode = 'advanced';

    elBasic.classList.add('hidden');
    elBasic.classList.remove('grid');

    elAdvansed.classList.remove('hidden');
    elRulesImage.src = '../images/rule-advanced.svg';

    elModeChangerButton.innerText = 'BASIC';
  }
}




// AI choose

function aiChoose() {
  const hands = ['rock', 'paper', 'scissors', ];
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

elRefreshGameButton.addEventListener('click', () => {
  swapZone(false);
  elFindWinner.innerText = '';
});


// Find winner

function checkWinner(user, ai) {
  const actions = {
    paper: {
      scissors: 'AI',
      rock: 'USER',
      spock: 'USER',
      lizart: 'AI',
    },
    scissors: {
      paper: 'USER',
      rock: 'AI',
      spock: 'AI',
      lizart: 'USER',
    },
    rock: {
      paper: 'AI',
      scissors: 'USER',
      spock: 'AI',
      lizart: 'USER',
    },
    spock: {
      scissors: 'USER',
      rock: 'USER',
      paper: 'AI',
      lizart: 'AI',
    },
    lizard: {
      scissors: 'AI',
      rock: 'AI',
      paper: 'USER',
      spock: 'USER',
    },
  };

  if (user === ai) {
    return "TIE";
  } else {
    return actions[user][ai];
  }
}

const winShadow = 'shadow-[0_0_0_25px_#fff2]';

elResultZone.classList.add('hidden');

elHands.forEach((elHand) => {
  elHand.addEventListener('click', (evt) => {
    swapZone(true);

    elUser.classList.remove(winShadow)
    elAi.classList.remove(winShadow)

    const user = evt.target.alt;
    const ai = aiChoose();

    elUser.src = evt.target.src;
    elAi.src = './images/choosing.svg';
    setTimeout(() => {
      elAi.src = `./images/${ai}.svg`;
      const winner = checkWinner(user, ai);

      if (winner === 'USER') {
        elFindWinner.innerText = 'YOU WIN';
        elUser.classList.add('shadow-[0_0_0_25px_#fff2]');
        changeScore()
      } else if (winner === 'AI') {
        elFindWinner.innerText = 'YOU LOSE';
        elAi.classList.add('shadow-[0_0_0_25px_#fff2]');
      } else {
        elFindWinner.innerText = 'TIE';
        elUser.classList.remove('shadow-[0_0_0_25px_#fff2]');
        elAi.classList.remove('shadow-[0_0_0_25px_#fff2]');
      }

    }, 1000);
  });
});

// Refresh game

elRefreshGameButton.addEventListener('click', () => {
  swapZone(false);
});


// Change score

function changeScore() {
  elScore.innerText = +elScore.innerText + 1;
  
}


// Change mode
elModeChangerButton.addEventListener("click", modeChanger)

// Start

modeChanger()