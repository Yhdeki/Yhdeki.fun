import Card from "../cardClass";
import Hand from "../handClass";
import type BlackjackPlayer from "./BlackjackPLayer";

class BlackjackHand extends Hand {
    aces: number;
    sum: number;
    lastAction: string;

    constructor() {
        super();
        this.aces = 0;
        this.sum = 0;
        this.lastAction = "none";
    }

    addToSum(card: Card): void {
        if (card.rank === "A") {
            // Ace counts as 11, but if that busts, count as 1
            this.aces += 1;
            this.sum += 11;
        } else if (card.getValue() > 9 && card.getValue() < 14) {
            this.sum += 10;
        } else {
            this.sum += Number(card.rank); // No NaN, only numbers now
        }

        // If we went over 21 and have aces, convert aces from 11 to 1
        while (this.sum > 21 && this.aces > 0) {
            this.sum -= 10;
            this.aces -= 1;
        }
        if (this.sum === 21) {
            this.updateStatus("Blackjack");
        } else if (this.sum > 21) {
            this.updateStatus("Bust");
        }
    }

    updateHand() {
        const clone: BlackjackHand = new BlackjackHand();
        clone.cards = [];
        this.cards.forEach((c) => clone.cards.push(new Card(c.suit, c.rank)));
        clone.sum = this.sum;
        clone.aces = this.aces;
        clone.betAmount = this.betAmount;
        clone.status = this.status;
        return clone;
    }
}

export default BlackjackHand;
