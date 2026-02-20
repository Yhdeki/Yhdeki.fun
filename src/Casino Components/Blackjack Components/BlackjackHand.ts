import type Card from "../cardClass";
import Hand from "../handClass";

class BlackjackHand extends Hand {
    addToSum(card: Card): void {
        super.addToSum(card);
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