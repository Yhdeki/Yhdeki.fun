import type Casino from "./casinoClass";
import InCasino from "./inCasinoClass";

// A player class that inherits from incasino
class Player extends InCasino {
    betAmount: number;
    amountOfChips: number;

    constructor(casino: Casino, chips: number) {
        super(casino);
        this.amountOfChips = chips;
        this.betAmount = 0;
    }
}

export default Player;
