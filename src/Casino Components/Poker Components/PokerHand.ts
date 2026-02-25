import type Card from "../cardClass";
import Hand from "../handClass";

/* 
	Hand Strengths:
	1 - high card
	2 - one pair
	3 - two pair
	4 - three of a kind
	5 - straight
	6 - flush
	7 - full house
	8 - four of a kind
	9 - straight flush
	10 - royal flush
*/

class PokerHand extends Hand {
    // The first number is the strength of the hand, the second is the highest card
    uniqueRanks: Set<string>;
    StrengthOfHand: number[];

    constructor() {
        super();
        this.StrengthOfHand = [0, 0];
        this.uniqueRanks = new Set<string>();
    }

    updateStrength() {
        const count: Map<string, number> = new Map();
        const valArray: number[] = this.cards.map((card) => card.getValue());

        // Flush
        for (const card of this.cards) {
            count.set(card.rank, (count.get(card.rank) || 0) + 1);
            if (card.suit !== this.cards[0].suit) {
                this.changeStrength(6, Math.max(...valArray));
            }
        }

        switch (count.size) {
            case 5:
                const min: number = Math.min(...valArray);
                const max: number = Math.max(...valArray);
                // Straight
                if (max - min === 4) {
                    // Straight flush
                    if (this.StrengthOfHand[0] === 6) {
                        // Royal flush
                        if (max === 14) {
                            this.changeStrength(10, max);
                        } else {
                            this.changeStrength(9, max);
                        }
                    } else {
                        this.changeStrength(5, max);
                    }
                }
                // High card
                else {
                    this.changeStrength(1, max);
                }
                break;
            case 2:
                // Full house
                if (count.get(this.uniqueRanks.values().next().value) === 2) {
                    this.changeStrength(7, this.cards[0].getValue());
                }
                // Four of a kind
                else {
                    this.changeStrength(8, this.cards[0].getValue());
                }
                break;
            case 3:
                // Two pair
                if (
                    count.get(this.uniqueRanks.values().next().value) === 2 ||
                    count.get([...this.uniqueRanks][1]) === 2
                ) {
                    this.changeStrength(3, Math.max(...valArray));
                }
                // Three of a kind
                else {
                    this.changeStrength(4, Math.max(...valArray));
                }
                break;
            case 4:
                // Pair
                this.changeStrength(2, Math.max(...valArray));
                break;
            default:
                break;
        }
    }

    addCardToHand(card: Card) {
        this.cards.push(card);
        this.uniqueRanks.add(card.rank);
    }
	
    changeStrength(strength: number, highestCard: number) {
        if (this.StrengthOfHand[0] < strength) {
            this.StrengthOfHand[0] = strength;
            this.StrengthOfHand[1] = highestCard;
        }
    }
}

export default PokerHand;
