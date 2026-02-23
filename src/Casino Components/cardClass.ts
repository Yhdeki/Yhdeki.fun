class Card {
    suit: string;
    rank: string;
    constructor(suit: string, rank: string) {
        this.suit = suit;
        this.rank = rank;
    }
    getValue(): number {
        switch (this.rank) {
            case "A":
                return 14;
            case "K":
                return 13;
            case "Q":
                return 12;
            case "J":
                return 11;
            case "10":
                return 10;
            default:
                return Number(this.rank);
        }
    }
}

export default Card;
