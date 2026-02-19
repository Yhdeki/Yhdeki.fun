import type Casino from "../Casino Components/casinoClass";
import type Dealer from "../Casino Components/dealerClass";
import type Player from "../Casino Components/playerClass";
import Card from "../Casino Components/cardClass";
import Hand from "../Casino Components/handClass";

// ─────────────────────────────────────────────
// We pass in the setter functions from React context
// so the game can update the UI after mutating the classes
// ─────────────────────────────────────────────
export interface GameSetters {
    setPlayerHands: (hands: Hand[]) => void;
    setDealerHands: (hands: Hand[]) => void;
    setPlayerChips: (chips: number) => void;
    setAvailableOptions: (options: string[]) => void;
    setSelectedOption: (option: string) => void;
    setGameEnd: (gameEnd: boolean) => void;
}

const BLACKJACK: number = 21;
let errorLbl: HTMLOutputElement;
let resultLbl: HTMLOutputElement;

let myCasino: Casino, myPlayer: Player, myDealer: Dealer;
let mySetters: GameSetters;

export function startGame(
    casino: Casino,
    player: Player,
    dealer: Dealer,
    setters: GameSetters,
) {
    setters.setGameEnd(false);
    setters.setSelectedOption(" ");

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
    player.hands = [new Hand()];
    dealer.hands = [new Hand()];

    // Validate Bet (on first hand)
    if (!isInputValid(0)) return;

    // Shuffle
    casino.shuffle();

    // deal two cards to the player and one to the dealer
    dealer.deal(player, 0);
    dealer.deal(player, 0);
    dealer.deal(dealer, 0);
    dealer.hands[0].cards.push(new Card("Clubs", "0")); // Hidden card

    updateUI();

    // Check Immediate blackjack
    if (player.hands[0].sum === BLACKJACK) {
        // Dealer check? standard rules usually check dealer blackjack too.
        // For now, simpler "Player wins" logic
        if (resultLbl) resultLbl.textContent = "Blackjack! You won!";
        player.amountOfChips += player.hands[0].betAmount * 2.5; // 3:2 usually?
        mySetters.setPlayerChips(player.amountOfChips);
        setters.setGameEnd(true);
        return;
    }

    updateOptions(0);
    pickOption();
}
function pickOption() {}

export function handleAction(selectedOption: string) {
    // Find active hand
    // For simplicity, we assume we play hands in order.
    // Find the first hand that is "Playing".
    const activeHandIndex = myPlayer.hands.findIndex(
        (h) => h.status === "Playing",
    );

    if (activeHandIndex === -1) {
        // No active hands? maybe dealer turn?
        return;
    }

    switch (selectedOption) {
        case "Hit":
            hit(activeHandIndex);
            break;
        case "Stand":
            stand(activeHandIndex);
            break;
        case "DoubleDown":
            doubleDown(activeHandIndex);
            break;
        case "Split":
            split(activeHandIndex);
            break;
        default:
            break;
    }
}

function isInputValid(handIndex: number) {
    const betButton = document.getElementById(
        "blackjack-bet",
    ) as HTMLInputElement;

    const valid: string = myPlayer.validBetCheck(betButton, handIndex);

    if (errorLbl) errorLbl.textContent = valid;

    return valid === "";
}

function updateUI() {
    mySetters.setPlayerHands(
        myPlayer.hands.map((h) => Object.assign(new Hand(), h)),
    );
    mySetters.setDealerHands([...myDealer.hands]);
    mySetters.setPlayerChips(myPlayer.amountOfChips);
}

function updateOptions(handIndex: number) {
    const hand = myPlayer.hands[handIndex];
    const options = ["Hit", "Stand"];

    // Check split availability
    if (hand.cards.length === 2 && myPlayer.amountOfChips >= hand.betAmount) {
        options.push("DoubleDown");
        if (hand.cards[0].rank === hand.cards[1].rank) {
            options.push("Split");
        }
    }

    mySetters.setAvailableOptions(options);
}

function hit(handIndex: number) {
    console.log("Hit on hand", handIndex);
    myDealer.deal(myPlayer, handIndex);
    updateUI();

    if (myPlayer.hands[handIndex].sum > BLACKJACK) {
        myPlayer.hands[handIndex].status = "Bust";
        if (errorLbl) errorLbl.textContent = "Bust!";
        checkNextHandOrDealer();
    }
}

function stand(handIndex: number) {
    console.log("Stand on hand", handIndex);
    myPlayer.hands[handIndex].status = "Stand";
    checkNextHandOrDealer();
}

function doubleDown(handIndex: number): void {
    if (myPlayer.amountOfChips < myPlayer.hands[handIndex].betAmount) {
        if (errorLbl) errorLbl.textContent = "Not enough chips to double!";
        return;
    }

    myPlayer.amountOfChips -= myPlayer.hands[handIndex].betAmount;
    myPlayer.hands[handIndex].betAmount *= 2;

    // Hit once then stand
    myDealer.deal(myPlayer, handIndex);
    updateUI();

    if (myPlayer.hands[handIndex].sum > BLACKJACK) {
        myPlayer.hands[handIndex].status = "Bust";
    } else {
        myPlayer.hands[handIndex].status = "Stand"; // Force stand after DD
    }
    checkNextHandOrDealer();
}

function split(handIndex: number): void {
    const originalHand = myPlayer.hands[handIndex];

    // Create new hand
    const newHand = new Hand();
    newHand.betAmount = originalHand.betAmount; // Match bet
    myPlayer.amountOfChips -= newHand.betAmount; // Deduct chips

    // Move second card to new hand
    const splitCard = originalHand.cards.pop();
    if (splitCard) {
        // Need to re-calculate sums since we popped a card
        // Reset sums and re-add remaining card
        // Simplify: just reset both hands and add their cards
        originalHand.sum = 0;
        originalHand.aces = 0;
        originalHand.addToSum(originalHand.cards[0]);

        newHand.cards.push(splitCard);
        newHand.addToSum(splitCard);
    }

    // Insert new hand after current hand
    // (Splitting Hand 0 -> Hand 0, Hand 1. If we split Hand 1 later, it becomes Hand 1, Hand 2)
    myPlayer.hands.splice(handIndex + 1, 0, newHand);

    // Deal 1 card to original hand
    myDealer.deal(myPlayer, handIndex);

    // Deal 1 card to new hand
    myDealer.deal(myPlayer, handIndex + 1);

    updateUI();
    updateOptions(handIndex); // Options for the current hand again
}

function checkNextHandOrDealer() {
    const nextHandIndex = myPlayer.hands.findIndex(
        (h) => h.status === "Playing",
    );
    if (nextHandIndex !== -1) {
        // Continue with next hand
        updateOptions(nextHandIndex);
    } else {
        // All player hands done
        dealerTurn();
    }
}

function dealerTurn() {
    // Only play if at least one player hand is not busted?
    // Standard rule: if all player hands bust, dealer doesn't play.
    const activeHands = myPlayer.hands.filter(
        (h) => h.status !== "Bust" && h.status !== "Surrender",
    );

    if (activeHands.length === 0) {
        finishGame();
        return;
    }

    // Reveal dealer card (remove the dummy "0" card or just flip it logic)
    // Our logic added a "0" card. Remove it and deal real one?
    // Existing logic: dealer.cards.push(new Card("Clubs", "0"));
    // Real logic: Dealer had 1 card dealt + 1 dummy.
    // We should probably remove the dummy and deal until >= 17.

    myDealer.hands[0].cards.pop(); // Remove dummy
    // Dealer needs to have 2 cards min to start?
    // "dealer.deal(dealer)" was called once.
    // deal(dealer) gives 1 card.
    // We need to deal the second card now?
    myDealer.deal(myDealer, 0);

    updateUI();

    // Dealer hits on soft 17? Let's assume Stand on 17.
    const dealerHand = myDealer.hands[0];

    const playDealer = () => {
        if (dealerHand.sum < 17) {
            setTimeout(() => {
                myDealer.deal(myDealer, 0);
                updateUI();
                playDealer();
            }, 800);
        } else {
            finishGame();
        }
    };

    playDealer();
}

function finishGame() {
    mySetters.setGameEnd(true);
    const dealerSum = myDealer.hands[0].sum;
    const dealerBust = dealerSum > 21;

    let resultText = "";

    myPlayer.hands.forEach((hand, index) => {
        if (hand.status === "Bust") {
            resultText += `Hand ${index + 1}: Bust`;
        } else {
            if (dealerBust) {
                resultText += `Hand ${index + 1}: Win!`;
                myPlayer.amountOfChips += hand.betAmount * 2;
            } else if (hand.sum > dealerSum) {
                resultText += `Hand ${index + 1}: Win!`;
                myPlayer.amountOfChips += hand.betAmount * 2;
            } else if (hand.sum === dealerSum) {
                resultText += `Hand ${index + 1}: Push`;
                myPlayer.amountOfChips += hand.betAmount;
            } else {
                resultText += `Hand ${index + 1}: Lose`;
            }
        }
    });

    if (resultLbl) resultLbl.textContent = resultText;
    updateUI(); // Final chip update
}
