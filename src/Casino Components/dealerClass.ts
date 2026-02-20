import type Card from "./cardClass";
import InCasino from "./inCasinoClass";

class Dealer extends InCasino {
    deal(target: InCasino, handIndex: number) {
        if (this.casino.deck.length === 0) {
            console.warn("Deck is empty!");
            return;
        }

        const card: Card = this.casino.deck[0];
        this.casino.deck.splice(0, 1); // remove it

        target.hands[handIndex].cards.push(card);
        target.hands[handIndex].addToSum(card);
    }
}

export default Dealer;