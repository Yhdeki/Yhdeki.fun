import type Casino from "../casinoClass";
import Player from "../playerClass";
import type PokerHand from "./PokerHand";

class PokerPlayer extends Player {
	hands: PokerHand[];

	constructor(casino: Casino, chips: number) {
		super(casino, chips);
		this.hands = [];
	}
	validBetCheck(betButton: HTMLInputElement, handIndex: number): string {
		return super.validBetCheck(betButton, handIndex);
	}
}

export default PokerPlayer;