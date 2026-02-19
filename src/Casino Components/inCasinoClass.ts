import type Casino from "./casinoClass";
import type Hand from "./handClass";

class InCasino {
	hands: Hand[];
    casino: Casino;

	constructor(casino: Casino) {
		this.hands = [];
		this.casino = casino;
	}
}

export default InCasino;