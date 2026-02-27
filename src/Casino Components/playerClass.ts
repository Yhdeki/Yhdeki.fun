import type Hand from "./handClass";
import type Casino from "./casinoClass";

class Player {
    casino: Casino;
    hands: Hand[];
    amountOfChips: number;

    constructor(casino: Casino, chips: number) {
        this.casino = casino;
        this.hands = [];
        this.amountOfChips = chips;
    }

    validBetCheck(betButton: HTMLInputElement, handIndex: number): string {
        const value: number = Number(betButton.value);

        // Number("abc") returns NaN, isNaN catches that
        if (isNaN(value) || betButton.value.trim() === "") {
            return "Invalid input";
        }

        this.hands[handIndex].betAmount = value;

        if (this.hands[handIndex].betAmount > this.amountOfChips) {
            this.hands[handIndex].betAmount = 0;
            return "Not enough chips!";
        } else if (this.hands[handIndex].betAmount <= 0) {
            this.hands[handIndex].betAmount = 0;
            return "Bet must be more than 0";
        } else {
            this.amountOfChips -= this.hands[handIndex].betAmount;
        }

        return "";
    }
}

export default Player;
