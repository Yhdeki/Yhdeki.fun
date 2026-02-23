import type Card from "../cardClass";
import Hand from "../handClass";

class BlackjackHand extends Hand {
    aces: number;
    sum: number;
    constructor() {
        super();
        this.aces = 0;
        this.sum = 0;
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
}

export default BlackjackHand;
