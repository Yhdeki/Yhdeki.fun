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
}

function BlackjackGame(
    casino: Casino,
    player: Player,
    dealer: Dealer,
    setters: GameSetters,
) {
	const BLACKJACK: number = 21;
    const betButton = document.getElementById(
        "blackjack-bet",
    ) as HTMLInputElement;
    const resultLbl = document.getElementById("result") as HTMLOutputElement;
	const errorLbl = document.getElementById("error-lbl") as HTMLOutputElement;

    const valid: string = validBetCheck(player, betButton);
	let availableOptions: string[] = ["Hit", "Stand", "DoubleDown", "Split"];

    errorLbl.textContent = valid;

    if (valid !== "") {
        return;
    }

    // Shuffle and deal two cards to the player and one to the dealer
    casino.shuffle();
	
    dealer.deal(player); // player card 1
    dealer.deal(player); // player card 2
    dealer.deal(dealer); // dealer card 1 (face up)
    dealer.cards.push(new Card("Clubs", "0"));
    // ─────────────────────────────────────────────
    // IMPORTANT: we spread into new arrays ([...])
    // because React checks if the reference changed.
    // If we pass player.cards directly (same reference),
    // React won't know it updated.
    // ─────────────────────────────────────────────
    setters.setPlayerCards([...player.cards]);
    setters.setDealerCards([...dealer.cards]);
    setters.setPlayerChips(player.amountOfChips);
    setters.setPlayerSum(player.sum);
    setters.setDealerSum(dealer.sum);

    // Check for immediate blackjack (21 with 2 cards)
    if (player.sum === BLACKJACK) {
        resultLbl.textContent = "Blackjack! You won!";
        player.amountOfChips += player.betAmount * 2;
		return;
    }
	showOptions(availableOptions, resultLbl);
}

function showOptions(options: string[], optionsLbl: HTMLOutputElement) {
    optionsLbl.textContent = "";
    for (let index = 0; index < options.length; index++) {
        const option = options[index];
        optionsLbl.textContent += `${index + 1}. ${option}\n`;
    }
}

function validBetCheck(player: Player, betButton: HTMLInputElement): string {
    const value = Number(betButton.value);

    // Number("abc") returns NaN, isNaN catches that
    if (isNaN(value) || betButton.value.trim() === "") {
        return "Invalid input";
    }

    player.betAmount = value;

    if (player.betAmount > player.amountOfChips) {
        return "Not enough chips!";
    } else if (player.betAmount <= 0) {
        return "Bet must be more than 0";
    } else {
        player.amountOfChips -= player.betAmount;
    }

    return "";
}

export default BlackjackGame;
