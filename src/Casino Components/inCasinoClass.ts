import type Card from "./cardClass";
import type Casino from "./casinoClass";

class InCasino {
    cards: Card[];
    aces: number;
    sum: number;
    casino: Casino;

    constructor(casino: Casino) {
        this.cards = [];
        this.aces = 0;
        this.sum = 0;
        this.casino = casino;
    }

    addToSum(card: Card) {
        // Number("J"), Number("Q"), Number("K") all return NaN – not 0
        // So we use isNaN() instead of try/catch
        const numValue = Number(card.rank);

        if (!isNaN(numValue)) {
            // It's a normal number card (2–10)
            this.sum += numValue;
        } else if (card.rank === "A") {
            // Ace counts as 11, but if that busts, count as 1
            this.aces += 1;
            this.sum += 11;
            // If we went over 21 and have aces, convert one ace from 11 to 1
            while (this.sum > 21 && this.aces > 0) {
                this.sum -= 10;
                this.aces -= 1;
            }
        } else {
            // J, Q, K are all worth 10
            this.sum += 10;
        }
    }
}

export default InCasino;