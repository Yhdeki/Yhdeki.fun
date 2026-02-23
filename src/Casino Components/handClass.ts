import type Card from "./cardClass";

class Hand {
    cards: Card[];
    betAmount: number;
    status: string;

    constructor() {
        this.cards = [];
        this.betAmount = 0;
        this.status = "Playing";
    }

    updateStatus(status: string) {
        this.status = status;
    }
}

export default Hand;
