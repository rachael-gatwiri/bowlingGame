export class BowlingGame {
  rolls: number[];
  currentFrame: number;
  tries: number;

  constructor() {
      this.rolls = [];
      this.currentFrame = 1;
      this.tries = 0;
  }

  roll(pins: number): void {
    if (this.currentFrame > 10) {
        throw new Error('Cannot input more than 10 frames');
    }

    if (this.tries >= 2) {
        this.currentFrame++;
        this.tries = 0; // Reset tries for a new frame
    }

    this.rolls.push(pins);
    this.tries++;
}

score(): number {
  let totalScore = 0;
  let rollIndex = 0;

  for (let frame = 0; frame < 10; frame++) {
    console.log(`Frame: ${frame + 1}, Roll Index: ${rollIndex}`);
      if (this.isStrike(rollIndex)) {
          totalScore += 10 + this.strikeBonus(rollIndex);
          rollIndex++;
      } else if (this.isSpare(rollIndex)) {
          totalScore += 10 + this.spareBonus(rollIndex);
          rollIndex += 2;
      } else {
          totalScore += this.sumOfPinsInFrame(rollIndex);
          rollIndex += 2;
      }
  }

  // Handle the final frame separately
  if (this.currentFrame === 11) {
      if (this.isStrike(this.rolls.length - 3)) {
          totalScore += this.rolls[this.rolls.length - 2] + this.rolls[this.rolls.length - 1];
      } else if (this.isSpare(this.rolls.length - 2)) {
          totalScore += this.rolls[this.rolls.length - 1];
      }
  }

  
  

  return totalScore;
}

  

  private isStrike(rollIndex: number): boolean {
      return this.rolls[rollIndex] === 10;
  }

  private isSpare(rollIndex: number): boolean {
      return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  private strikeBonus(rollIndex: number): number {
      return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  private spareBonus(rollIndex: number): number {
      return this.rolls[rollIndex + 2];
  }

  private sumOfPinsInFrame(rollIndex: number): number {
      return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
  }
}


// Example usage:
const game = new BowlingGame();
game.roll(4);
game.roll(5);

game.roll(10);
game.roll(3);

game.roll(10);
game.roll(10);

game.roll(2);
game.roll(4);

game.roll(10);
game.roll(4);

game.roll(8);
game.roll(10);

game.roll(5);
game.roll(6);

game.roll(6);
game.roll(4);

game.roll(10);
game.roll(10);



const totalScore = game.score();
console.log('Total Score:', totalScore);
