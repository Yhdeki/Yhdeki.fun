import type Casino from "./casinoClass";
import InCasino from "./inCasinoClass";

// A player class that inherits from incasino
class Player extends InCasino {
    betAmount: number;
    amountOfChips: number;

    constructor(casino: Casino, chips: number) {
        super(casino);
        this.amountOfChips = chips;
        this.betAmount = 0;
    }
	validBetCheck(betButton: HTMLInputElement): string {
    const value = Number(betButton.value);

    // Number("abc") returns NaN, isNaN catches that
    if (isNaN(value) || betButton.value.trim() === "") {
        return "Invalid input";
    }

    this.betAmount = value;

    if (this.betAmount > this.amountOfChips) {
		this.betAmount = 0;
        return "Not enough chips!";
    } else if (this.betAmount <= 0) {
		this.betAmount = 0;
        return "Bet must be more than 0";
    } else {
        this.amountOfChips -= this.betAmount;
    }

    return "";
}
}

export default Player;
