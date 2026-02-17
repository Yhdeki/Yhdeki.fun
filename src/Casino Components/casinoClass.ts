import Card from "./cardClass";

class Casino {
    deck: Card[];

    constructor() {
        this.deck = [];
        this.buildDeck();
    }

    // Separated into its own method so resetDeck() can reuse it
    private buildDeck() {
        const suits: string[] = ["Hearts", "Diamonds", "Clubs", "Spades"];
        const ranks: string[] = [
            "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "J", "Q", "K", "A",
        ];
        this.deck = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                this.deck.push(new Card(suit, rank));
            }
        }
    }

    // Shuffles the deck in place
    shuffle() {
        // Fisher-Yates shuffle – more fair than .sort(() => Math.random() - 0.5)
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    // Rebuilds and reshuffles a fresh deck (called between rounds)
    resetDeck() {
        this.buildDeck();
        this.shuffle();
    }
}

export default Casino;