import Dealer from "../dealerClass";
import type Casino from "../casinoClass";
import type BlackjackHand from "./BlackjackHand";
import type BlackjackPlayer from "./BlackjackPLayer";

class BlackjackDealer extends Dealer {
	hands: BlackjackHand[];
    constructor(casino: Casino) {
        super(casino);
		this.hands = [];
    }

	deal(target: BlackjackDealer | BlackjackPlayer, handIndex: number): void {
		super.deal(target, handIndex);
		target.hands[handIndex].addToSum(target.hands[handIndex].cards[target.hands[handIndex].cards.length - 1]);
	}
}

export default BlackjackDealer;