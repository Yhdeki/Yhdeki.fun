import type Casino from "../casinoClass";
import Player from "../playerClass";
import type PokerHand from "./PokerHand";

class PokerPlayer extends Player {
	hands: PokerHand[];

	constructor(casino: Casino, chips: number) {
		super(casino, chips);
		this.hands = [];
	}
}

export default PokerPlayer;