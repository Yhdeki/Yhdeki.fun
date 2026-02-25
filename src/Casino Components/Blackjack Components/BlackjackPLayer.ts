import Player from "../playerClass";
import type Casino from "../casinoClass";
import type BlackjackHand from "./BlackjackHand";

class BlackjackPlayer extends Player {
	hands: BlackjackHand[];

	constructor(casino: Casino, chips: number) {
		super(casino, chips);
		this.hands = [];
	}
	
	validBetCheck(betButton: HTMLInputElement, handIndex: number): string {
		return super.validBetCheck(betButton, handIndex);
	}
}

export default BlackjackPlayer;