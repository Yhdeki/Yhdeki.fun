import type Card from "./cardClass";

class Hand {
    cards: Card[];
    aces: number;
    sum: number;
    betAmount: number;
    status: string;

    constructor() {
        this.cards = [];
        this.aces = 0;
        this.sum = 0;
        this.betAmount = 0;
        this.status = "Playing";
    }

    addToSum(card: Card) {
		if (card.rank === "A") {
			// Ace counts as 11, but if that busts, count as 1
            this.aces += 1;
            this.sum += 11;
		}
        else if (card.isWorthTen()) {
            this.sum += 10;
        } else {
            this.sum += Number(card.rank); // No NaN, only numbers now
        }
    }
    updateStatus(status: string) {
        this.status = status;
    }
}

export default Hand;
