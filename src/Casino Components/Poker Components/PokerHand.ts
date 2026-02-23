import Hand from "../handClass";

class PokerHand extends Hand {
    value: string;

    constructor() {
        super();
        this.value = "2";
    }

    updateStrength() {
        let flush: boolean = true;

        const count: Map<string, number> = new Map();
        const straight: number[] = this.cards.map((card) => card.getValue());

        for (const card of this.cards) {
            count.set(card.rank, (count.get(card.rank) || 0) + 1);
            if (card.suit !== this.cards[0].suit) {
                flush = false;
            }
        }
        if (count.size === 5) {
            const min: number = Math.min(...straight);
            const max: number = Math.max(...straight);
            if (max - min === 4) {
                this.value = "Straight";
            }
        }
    }
}

export default PokerHand;
