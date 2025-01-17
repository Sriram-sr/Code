const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler() {
  const monsterDamage = dealMonsterDamage(ATTACK_VALUE);
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentMonsterHealth -= monsterDamage;
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Player Won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Monster Won!');
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert('Game is draw!');
  }
}

attackBtn.addEventListener('click', attackHandler);
