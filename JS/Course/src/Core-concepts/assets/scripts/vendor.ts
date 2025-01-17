const monsterHealthBar = document.getElementById(
  'monster-health'
) as HTMLProgressElement;
const playerHealthBar = document.getElementById(
  'player-health'
) as HTMLProgressElement;
const bonusLifeEl = document.getElementById('bonus-life') as HTMLElement;

const attackBtn = document.getElementById('attack-btn') as HTMLButtonElement;
const strongAttackBtn = document.getElementById(
  'strong-attack-btn'
) as HTMLButtonElement;
const healBtn = document.getElementById('heal-btn') as HTMLButtonElement;
const logBtn = document.getElementById('log-btn') as HTMLButtonElement;

function adjustHealthBars(maxLife: number): void {
  monsterHealthBar.max = maxLife;
  monsterHealthBar.value = maxLife;
  playerHealthBar.max = maxLife;
  playerHealthBar.value = maxLife;
}

function dealMonsterDamage(damage: number): number {
  const dealtDamage = Math.random() * damage;
  monsterHealthBar.value = +monsterHealthBar.value - dealtDamage;
  return dealtDamage;
}

function dealPlayerDamage(damage: number): number {
  const dealtDamage = Math.random() * damage;
  playerHealthBar.value = +playerHealthBar.value - dealtDamage;
  return dealtDamage;
}

function increasePlayerHealth(healValue: number): void {
  playerHealthBar.value = Math.min(
    playerHealthBar.max,
    +playerHealthBar.value + healValue
  );
}

function resetGame(value: number): void {
  playerHealthBar.value = value;
  monsterHealthBar.value = value;
}

function removeBonusLife(): void {
  if (bonusLifeEl && bonusLifeEl.parentNode) {
    bonusLifeEl.parentNode.removeChild(bonusLifeEl);
  }
}

function setPlayerHealth(health: number): void {
  playerHealthBar.value = health;
}
