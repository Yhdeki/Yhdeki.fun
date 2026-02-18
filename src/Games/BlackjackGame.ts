import type Casino from "../Casino Components/casinoClass";
import type Dealer from "../Casino Components/dealerClass";
import type Player from "../Casino Components/playerClass";
import Card from "../Casino Components/cardClass";

// ─────────────────────────────────────────────
// We pass in the setter functions from React context
// so the game can update the UI after mutating the classes
// ─────────────────────────────────────────────
interface GameSetters {
    setPlayerCards: (cards: Card[]) => void;
    setDealerCards: (cards: Card[]) => void;
    setPlayerChips: (chips: number) => void;
    setPlayerSum: (sum: number) => void;
    setDealerSum: (sum: number) => void;
    setAvailableOptions: (options: string[]) => void;
    setSelectedOption: (option: string) => void;
    setGameEnd: (gameEnd: boolean) => void;
	setNumOfCardContainers: (numOfCardContainers: number) => void;
}

const BLACKJACK: number = 21;
let errorLbl: HTMLOutputElement;
let resultLbl: HTMLOutputElement;

let myCasino: Casino, myPlayer: Player, myDealer: Dealer;
let mySetters: GameSetters;

function BlackjackGame(
    casino: Casino,
    player: Player,
    dealer: Dealer,
    selectedOption: string,
    setters: GameSetters,
) {
    setters.setGameEnd(false);
	setters.setNumOfCardContainers(1);

    myCasino = casino;
    myPlayer = player;
    myDealer = dealer;
    mySetters = setters;

    resultLbl = document.getElementById(
        "blackjack-result",
    ) as HTMLOutputElement;
    errorLbl = document.getElementById("blackjack-error") as HTMLOutputElement;

    resultLbl.textContent = "";
    errorLbl.textContent = "";
    if (!isInputValid()) return;

    // Shuffle
    casino.shuffle();

    // deal two cards to the player and one to the dealer
    dealer.deal(player);
    dealer.deal(player);
    dealer.deal(dealer);
    dealer.cards.push(new Card("Clubs", "0"));

    // Set all
    setters.setPlayerCards([...player.cards]);
    setters.setDealerCards([...dealer.cards]);
    setters.setPlayerChips(player.amountOfChips);
    setters.setPlayerSum(player.sum);
    setters.setDealerSum(dealer.sum);

    // Immediate blackjack
    if (player.sum === BLACKJACK) {
        resultLbl.textContent = "Blackjack! You won!";
        player.amountOfChips += player.betAmount * 2;
        return;
    }
    // Set options (remove split if necessary)
    if (player.cards[0].rank !== player.cards[1].rank) {
        setters.setAvailableOptions(["Hit", "Stand", "DoubleDown"]);
    } else {
        setters.setAvailableOptions(["Hit", "Stand", "DoubleDown", "Split"]);
    }

    while (player.sum < 21) {
        switch (selectedOption) {
            case "Hit":
                hit();
                break;
            case "Stand":
                break;
            case "DoubleDown":
                doubleDown();
                break;
            case "Split":
                split();
                break;
			default:
				break;
        }
    }
}

function isInputValid() {
    const betButton = document.getElementById(
        "blackjack-bet",
    ) as HTMLInputElement;

    const valid: string = myPlayer.validBetCheck(betButton);

    errorLbl.textContent = valid;

    return valid === "";
}

function hit() {
    myDealer.deal(myPlayer);
    mySetters.setPlayerCards([...myPlayer.cards]);
    mySetters.setPlayerSum(myPlayer.sum);
}

function doubleDown(): void {
    hit();
    myPlayer.amountOfChips -= myPlayer.betAmount;
    myPlayer.betAmount *= 2;
    mySetters.setPlayerChips(myPlayer.amountOfChips);
    mySetters.setPlayerSum(myPlayer.sum);
}

function split(): void {
    myDealer.deal(myPlayer);
    myDealer.deal(myPlayer);
}

function calculateWinning(): number {
    const bust = findBust();
    if (bust !== -1) {
        return bust;
    } else if (myPlayer.sum > myDealer.sum) {
        resultLbl.textContent = "You win!";
        return 2;
    } else if (myPlayer.sum < myDealer.sum) {
        resultLbl.textContent = "You lose.";
        return 0;
    } else {
        resultLbl.textContent = "Push!";
        return 1;
    }
}

function findBust(): number {
    if (myPlayer.sum > BLACKJACK) {
        resultLbl.textContent = "You busted! You lose.";
        return 0;
    } else if (myDealer.sum > BLACKJACK) {
        resultLbl.textContent = "Dealer busted! You win!";
        return 2;
    }
    return -1;
}
export default BlackjackGame;
