"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");

let game;
beforeEach(() => {
    game = new main_1.BowlingGame();
});

const rollMany = (rolls, pins) =>{
    for (let i = 0; i < rolls; i++) {
        game.roll(pins);
    }
};

const rollSpare = () => {
    game.roll(5);
    game.roll(5);
};

const rollStrike = () => {
    game.roll(10);
};

describe("Bowling Game", () => {
    it('should include 10 frames for the bowler', () => {
        rollMany(20, 1); 
        expect(game.currentFrame).toThrowError('Game Over');
    });
    

    it('should allow up to only two tries per frame', () => {
        game.roll(5);
        game.roll(4);
        game.roll(3);
        expect(game.currentFrame).toBe(2); 
    })

    it('should record rolls correcttly', () => {
        game.roll(5);
        game.roll(4);
        game.roll(3);
        game.roll(2);
        game.roll(10);
        game.roll(3);
        game.roll(4);
        expect(game.rolls).toEqual([5, 4, 3, 2, 10, 3, 4]);
    });

    it('calculates score for a frame with no strikes or spares', () => {
        game.roll(3);
        game.roll(4);
        rollMany(18, 0);
        expect(game.score()).toBe(7);
    });

    it('calculates score for a spare', () => {
        rollSpare();
        game.roll(3);
        rollMany(17, 0);
        expect(game.score()).toBe(16);
    });

    it('calculates score for a strike', () => {
        rollStrike();
        game.roll(3);
        game.roll(4);
        rollMany(16, 0);
        expect(game.score()).toBe(24);
    });


    it('calculates score for a perfect game', () => {
        rollMany(12, 10);
        expect(game.score()).toBe(300);
    });
});

    


