import Dealer from "../dealerClass";
import type Casino from "../casinoClass";
import type BlackjackHand from "./BlackjackHand";

class BlackjackDealer extends Dealer {
	hands: BlackjackHand[];
    constructor(casino: Casino) {
        super(casino);
		this.hands = [];
    }
}

export default BlackjackDealer;