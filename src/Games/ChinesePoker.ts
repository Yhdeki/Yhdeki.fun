import type PokerDealer from "../Casino Components/Poker Components/PokerDealer";
import PokerHand from "../Casino Components/Poker Components/PokerHand";
import type PokerPlayer from "../Casino Components/Poker Components/PokerPlayer";
import Card from "../Casino Components/cardClass";
import type Casino from "../Casino Components/casinoClass";
import type { GameSetters } from "./GameSetters";

let errorLbl: HTMLOutputElement;
let resultLbl: HTMLOutputElement;

let myCasino: Casino, myPlayer: PokerPlayer, myDealer: PokerDealer;
let mySetters: GameSetters;

export function startGame(
    casino: Casino,
    player: PokerPlayer,
    dealer: PokerDealer,
    setters: GameSetters,
) {
    myCasino = casino;
    myPlayer = player;
    myDealer = dealer;
    mySetters = setters;

    resultLbl = document.getElementById(
        "blackjack-result",
    ) as HTMLOutputElement;
    errorLbl = document.getElementById("blackjack-error") as HTMLOutputElement;

    if (resultLbl) resultLbl.textContent = "";
    if (errorLbl) errorLbl.textContent = "";

    // Initialize Hands
    player.hands = [
        new PokerHand(),
        new PokerHand(),
        new PokerHand(),
        new PokerHand(),
        new PokerHand(),
    ];
    dealer.hands = [
        new PokerHand(),
        new PokerHand(),
        new PokerHand(),
        new PokerHand(),
        new PokerHand(),
    ];

    setters.setGameEnd(false);
    setters.setSelectedOption("none");

    // Shuffle
    casino.shuffle();

    // Initialize hands
    for (let i = 0; i < 5; i++) {
        dealer.deal(player, i);
        dealer.deal(dealer, i);
    }

    updateUI();
}

function updateUI() {
    mySetters.setPlayerHandsCards(
        myPlayer.hands.map((h) => {
            const clone: PokerHand = new PokerHand();
            clone.cards = h.cards.map((c) => new Card(c.suit, c.rank));
            clone.betAmount = h.betAmount;
            clone.status = h.status;
            clone.StrengthOfHand = h.StrengthOfHand;
            clone.uniqueRanks = h.uniqueRanks;
            return clone;
        }),
    );
    mySetters.setDealerHandsCards(
        myDealer.hands.map((h) => {
            const clone: PokerHand = new PokerHand();
            clone.cards = h.cards.map((c) => new Card(c.suit, c.rank));
            clone.betAmount = h.betAmount;
            clone.status = h.status;
            clone.StrengthOfHand = h.StrengthOfHand;
            clone.uniqueRanks = h.uniqueRanks;
            return clone;
        }),
    );
    mySetters.setPlayerChips(myPlayer.amountOfChips);
}
