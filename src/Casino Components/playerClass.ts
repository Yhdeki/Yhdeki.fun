import InCasino from "./inCasinoClass";
import type Hand from "./handClass";
import type Casino from "./casinoClass";

// A player class that inherits from incasino
class Player extends InCasino{
    amountOfChips: number;

    get activeHands(): Hand[] {
		return this.hands.filter((hand) => hand.status === "Playing");
	}
    constructor(casino: Casino, chips: number) {
        super(casino);
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
