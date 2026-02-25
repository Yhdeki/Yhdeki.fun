import type Casino from "../casinoClass";
import Dealer from "../dealerClass";
import type PokerHand from "./PokerHand";
import type PokerPlayer from "./PokerPlayer";

class PokerDealer extends Dealer {
	hands: PokerHand[];

	constructor(casino: Casino) {
		super(casino);
		this.hands = [];
	}

	deal(target: PokerDealer | PokerPlayer, handIndex: number): void {
		super.deal(target, handIndex);
	}
}

export default PokerDealer;
