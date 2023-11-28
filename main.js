"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BowlingGame = void 0;
var BowlingGame = /** @class */ (function () {
    //initialize the 'rolls' array when a new instance of the BowlingGame class is created
    function BowlingGame() {
        this.rolls = [];
    }
    //record the number of pins knocked down in each roll by pushing the number of pins to the 'rolls' array
    BowlingGame.prototype.roll = function (pins) {
        this.rolls.push(pins);
    };
    //calculate the total score for the game based on the number of pins knocked down in each roll
    //the 'score()' method uses a loop to iterate through each frame of the game
    BowlingGame.prototype.score = function () {
        var totalScore = 0;
        var rollIndex = 0;
        console.log('Rolls:', this.rolls);
        //check for strikes and spares in each frame and add the appropriate bonus points to the total score
        for (var frame = 0; frame < 10; frame++) {
            console.log("Frame: ".concat(frame + 1, ", Roll Index: ").concat(rollIndex));
            if (frame === 9) {
                // Handle the final frame differently
                totalScore += this.finalFrameScore(rollIndex);
                break; // Exit the loop after processing the final frame
            }
            //if the current roll is a strike, add 10 points plus the next two rolls to the total score
            if (this.isStrike(rollIndex)) {
                totalScore += 10 + this.strikeBonus(rollIndex);
                rollIndex++;
                //if the current roll is a spare, add 10 points plus the next roll to the total score
            }
            else if (this.isSpare(rollIndex)) {
                totalScore += 10 + this.spareBonus(rollIndex);
                rollIndex += 2;
                //if the current roll is neither a strike nor a spare, add the number of pins knocked down in the current frame to the total score
            }
            else {
                totalScore += this.sumOfPinsInFrame(rollIndex);
                rollIndex += 2;
            }
        }
        console.log('Total Score:', totalScore);
        return totalScore;
    };
    //check if the current roll is a strike
    BowlingGame.prototype.isStrike = function (rollIndex) {
        return this.rolls[rollIndex] === 10;
    };
    //check if the current roll is a spare
    BowlingGame.prototype.isSpare = function (rollIndex) {
        return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
    };
    //calculate the bonus points for a strike
    BowlingGame.prototype.strikeBonus = function (rollIndex) {
        return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
    };
    //calculate the bonus points for a spare
    BowlingGame.prototype.spareBonus = function (rollIndex) {
        return this.rolls[rollIndex + 2];
    };
    //calculate the total number of pins knocked down in a frame
    BowlingGame.prototype.sumOfPinsInFrame = function (rollIndex) {
        return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
    };
    BowlingGame.prototype.finalFrameScore = function (rollIndex) {
        var frameScore = 0;
        frameScore += this.sumOfPinsInFrame(rollIndex);
        if (this.isStrike(rollIndex) || this.isSpare(rollIndex)) {
            frameScore += this.rolls[rollIndex + 2] || 0;
        }
        return frameScore;
    };
    return BowlingGame;
}());
exports.BowlingGame = BowlingGame;
