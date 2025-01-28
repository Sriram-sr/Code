const startGameBtn = document.getElementById(
  'start-game-btn'
) as HTMLButtonElement;

const SELECTION_ROCK = 'rock';
const SELECTION_PAPER = 'paper';
const SELECTION_SCISSORS = 'scissors';

let isGameRunning = false;

const getPlayerChoice = function () {
  const selection = prompt('Rock, Paper or Scissors?', '')?.toLowerCase();
  if (
    selection !== SELECTION_ROCK &&
    selection !== SELECTION_PAPER &&
    selection !== SELECTION_SCISSORS
  ) {
    alert('Invalid choice! We chose Rock for you!');
    return 'rock';
  }
  return selection;
};

startGameBtn.addEventListener('click', function () {
  if (isGameRunning) {
    return;
  }
  isGameRunning = true;
  console.log('Game is starting...');
  const playerChoice = getPlayerChoice();
  console.log(playerChoice);
});
