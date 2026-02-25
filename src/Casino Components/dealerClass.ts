import type Card from "./cardClass";
import type Casino from "./casinoClass";
import type Hand from "./handClass";
import type Player from "./playerClass";

class Dealer {
    casino: Casino;
    hands: Hand[];

    constructor(casino: Casino) {
        this.casino = casino;
        this.hands = [];
    }

    deal(target: Dealer | Player, handIndex: number) {
        if (this.casino.deck.length === 0) {
            console.warn("Deck is empty!");
            return;
        }

        const card: Card = this.casino.deck[0];
        this.casino.deck.splice(0, 1); // remove it

        target.hands[handIndex].cards.push(card);
    }
}

export default Dealer;
