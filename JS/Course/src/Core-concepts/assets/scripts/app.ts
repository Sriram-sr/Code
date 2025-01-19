const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(): void {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound(): void {
  let initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
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

function attackMonster(mode: 'ATTACK' | 'STONG_ATTACK'): void {
  let maxDamage;
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const monsterDamage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= monsterDamage;
  endRound();
}

function attackHandler(): void {
  attackMonster('ATTACK');
}

function strongAttackHandler(): void {
  attackMonster('STONG_ATTACK');
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

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
