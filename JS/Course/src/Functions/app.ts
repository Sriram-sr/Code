const startGameBtn = document.getElementById(
  'start-game-btn'
) as HTMLButtonElement;

const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

let isGameRunning = false;

const getPlayerChoice = function () {
  const selection = prompt('Rock, Paper or Scissors?', '')?.toLowerCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert('Invalid choice! We chose Rock for you!');
    return 'rock';
  }
  return selection;
};

const getComputerChoice = function () {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = function (cChoice: string, pChoice: string) {
  console.log(`Computer chose ${cChoice}`);
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

startGameBtn.addEventListener('click', function () {
  if (isGameRunning) {
    return;
  }
  isGameRunning = true;
  const computerChoice = getComputerChoice();
  const playerChoice = getPlayerChoice();
  const winner = getWinner(computerChoice, playerChoice);
  console.log(winner);
});
