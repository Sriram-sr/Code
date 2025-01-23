const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

interface LogEntryProto {
  event: string;
  value: number;
  finalMonsterHealth: number;
  finalPlayerHealth: number;
  target?: string;
}

const enteredValue = prompt('Enter the Max life for you and the monster');
let chosenMaxLife = parseInt(enteredValue ? enteredValue : '100');
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
const battleLogs: Array<LogEntryProto> = [];

adjustHealthBars(chosenMaxLife);

function writeToLogging(
  event: string,
  value: number,
  monsterHealth: number,
  playerHealth: number
): void {
  if (
    event !== LOG_EVENT_PLAYER_ATTACK &&
    event !== LOG_EVENT_PLAYER_STRONG_ATTACK &&
    event !== LOG_EVENT_MONSTER_ATTACK &&
    event !== LOG_EVENT_PLAYER_HEAL &&
    event !== LOG_EVENT_GAME_OVER
  ) {
    return;
  }
  let logEntry: LogEntryProto = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = 'MONSTER';
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logEntry.target = 'PLAYER';
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logEntry.target = 'PLAYER';
  }
  battleLogs.push(logEntry);
}

function reset(): void {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound(): void {
  let initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLogging(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    currentPlayerHealth = initialPlayerHealth;
    hasBonusLife = false;
    removeBonusLife();
    setPlayerHealth(initialPlayerHealth);
    alert('You would be lost but the bonus life saved you!');
  }
  const playerWinCondition =
    currentMonsterHealth <= 0 && currentPlayerHealth > 0;
  const monsterWinCondition =
    currentPlayerHealth <= 0 && currentMonsterHealth > 0;
  const drawCondition = currentMonsterHealth <= 0 && currentPlayerHealth <= 0;
  if (playerWinCondition) {
    alert('Player Won!');
  } else if (monsterWinCondition) {
    alert('Monster Won!');
  } else if (drawCondition) {
    alert('Game is draw!');
  }

  if (playerWinCondition || monsterWinCondition || drawCondition) {
    reset();
  }
}

function attackMonster(mode: string): void {
  const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  endRound();
}

function attackHandler(): void {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler(): void {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(): void {
  let healValue: number;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal more than your choosen Max life");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  endRound();
}

function printToLogHandler(): void {
  console.log(battleLogs);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printToLogHandler);
