class Card {
  suit: string;
  rank: string;
  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }
  isWorthTen() {
	return ["10", "J", "Q", "K"].includes(this.rank);
  }
}

export default Card;
