import InCasino from "./inCasinoClass";

class Dealer extends InCasino {

    deal(target: InCasino, handIndex: number) {
        if (this.casino.deck.length === 0) {
            console.warn("Deck is empty!");
            return;
        }

        // Take the top card (index 0) instead of a random one
        // The deck is already shuffled, so this is correct
        const card = this.casino.deck[0];
        this.casino.deck.splice(0, 1); // remove the top card  ← fixed: was splice(indexOf) which had a bug

        target.hands[handIndex].cards.push(card);
        target.hands[handIndex].addToSum(card);
    }
}

export default Dealer;