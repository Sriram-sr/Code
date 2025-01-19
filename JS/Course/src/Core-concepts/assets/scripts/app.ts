const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound(): void {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Player Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Monster Won!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('Game is draw!');
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
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
