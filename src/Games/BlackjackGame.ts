import type Casino from "../Casino Components/casinoClass";
import Card from "../Casino Components/cardClass";
import BlackjackHand from "../Casino Components/Blackjack Components/BlackjackHand";
import type BlackjackPlayer from "../Casino Components/Blackjack Components/BlackjackPLayer";
import type BlackjackDealer from "../Casino Components/Blackjack Components/BlackjackDealer";
import type { GameSetters } from "./GameSetters";

const BLACKJACK: number = 21;
let errorLbl: HTMLOutputElement;
let resultLbl: HTMLOutputElement;

let myCasino: Casino, myPlayer: BlackjackPlayer, myDealer: BlackjackDealer;
let mySetters: GameSetters;
let dealerHiddenCard: Card;

export function startGame(
    casino: Casino,
    player: BlackjackPlayer,
    dealer: BlackjackDealer,
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
    player.hands = [new BlackjackHand()];
    dealer.hands = [new BlackjackHand()];

    // Validate Bet (on first hand)
    if (!isInputValid(0)) return;

    setters.setGameEnd(false);
    setters.setSelectedOption("none");

    // Shuffle
    casino.shuffle();

    // deal two cards to the player and one to the dealer
    dealer.deal(player, 0);
    dealer.deal(player, 0);
    dealer.deal(dealer, 0);
    dealer.hands[0].cards.push(new Card("Clubs", "0")); // Face-down card (not added to sum)

    dealerHiddenCard = casino.deck[0];
    dealer.hands[0].addToSum(dealerHiddenCard);
    casino.deck.splice(0, 1);

    updateUI();

    // Check immediate blackjack for dealer and player
    if (dealer.hands[0].sum === BLACKJACK) {
        dealer.hands[0].cards.pop();
        dealer.hands[0].cards.push(dealerHiddenCard);
        finishGame();
        return;
    }

    if (player.hands[0].sum === BLACKJACK) {
        // Dealer check? standard rules usually check dealer blackjack too.
        // For now, simpler "Player wins" logic
        if (resultLbl) resultLbl.textContent = "Blackjack! You won!";
        player.hands[0].updateStatus("Blackjack");
        player.amountOfChips += player.hands[0].betAmount * 2.5; // 3:2 usually?
        mySetters.setPlayerChips(player.amountOfChips);
        setters.setGameEnd(true);
        return;
    }

    updateOptions(0);
    while (myPlayer.hands.some((h) => h.status === "Playing")) {
        const currentHandIndex: number = myPlayer.hands.findIndex(
            (h) => h.status === "Playing",
        );
        updateOptions(currentHandIndex);
        break;
    }
}

export function handleAction(selectedOption: string) {
    updateUI();
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
    updateUI();
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
    mySetters.setPlayerHandsCards(
        myPlayer.hands.map((h) => {
            const clone: BlackjackHand = new BlackjackHand();
            clone.cards = h.cards.map((c) => new Card(c.suit, c.rank));
            clone.sum = h.sum;
            clone.aces = h.aces;
            clone.betAmount = h.betAmount;
            clone.status = h.status;
            return clone;
        }),
    );
    mySetters.setDealerHandsCards(
        myDealer.hands.map((h) => {
            const clone: BlackjackHand = new BlackjackHand();
            clone.cards = h.cards.map((c) => new Card(c.suit, c.rank));
            clone.sum = h.sum;
            clone.aces = h.aces;
            clone.betAmount = h.betAmount;
            clone.status = h.status;
            return clone;
        }),
    );
    mySetters.setPlayerChips(myPlayer.amountOfChips);
}

function updateOptions(handIndex: number) {
    updateUI();
    const hand: BlackjackHand = myPlayer.hands[handIndex];
    let options: string[] = ["Hit", "Stand"];

    // Check split availability
    if (hand.cards.length === 2 && myPlayer.amountOfChips >= hand.betAmount) {
        options.push("DoubleDown");
        if (
            hand.cards[0].rank === hand.cards[1].rank ||
            (hand.cards[0].getValue() > 9 &&
                hand.cards[0].getValue() < 14 &&
                hand.cards[1].getValue() > 9 &&
                hand.cards[1].getValue() < 14) // A jack and a King can split
        ) {
            options.push("Split");
        }
    }
    if (hand.sum === BLACKJACK) {
        options = [];
    }

    mySetters.setAvailableOptions(options);
}

function hit(handIndex: number) {
    myDealer.deal(myPlayer, handIndex);
    updateUI();

    if (myPlayer.hands[handIndex].sum > BLACKJACK) {
        myPlayer.hands[handIndex].updateStatus("Bust");
        if (errorLbl) errorLbl.textContent = "Bust!";
        checkNextHandOrDealer();
    } else if (myPlayer.hands[handIndex].sum === BLACKJACK) {
        myPlayer.hands[handIndex].updateStatus("Blackjack");
    }
}

function stand(handIndex: number) {
    myPlayer.hands[handIndex].updateStatus("Stand");
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
        myPlayer.hands[handIndex].updateStatus("Bust");
    } else if (myPlayer.hands[handIndex].sum === BLACKJACK) {
        myPlayer.hands[handIndex].updateStatus("Blackjack");
    } else {
        myPlayer.hands[handIndex].updateStatus("Stand"); // Force stand after DD
    }
    checkNextHandOrDealer();
}

function split(handIndex: number): void {
    const originalHand: BlackjackHand = myPlayer.hands[handIndex];

    // Create new hand
    const newHand: BlackjackHand = new BlackjackHand();
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

    // You can't play when splitting aces
    if (splitCard && splitCard.rank === "A") {
        checkNextHandOrDealer();
    } else {
        updateOptions(handIndex); // Options for the current hand again
    }
}

function checkNextHandOrDealer() {
    updateUI();
    const nextHandIndex: number = myPlayer.hands.findIndex(
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
    updateUI();
    // Only play if at least one player hand is not busted?
    const activeHands: BlackjackHand[] = myPlayer.hands.filter(
        (h) => h.status !== "Bust",
    );

    if (activeHands.length === 0) {
        finishGame();
        return;
    }

    myDealer.hands[0].cards.pop(); // Remove face down card
    myDealer.hands[0].cards.push(dealerHiddenCard); // Swap in the pre-drawn hidden card (sum already includes it)

    updateUI();

    // Dealer hits on soft 17? Let's assume Stand on 17.
    const dealerHand: BlackjackHand = myDealer.hands[0];

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
    updateUI();
    const dealerSum: number = myDealer.hands[0].sum;
    const dealerBust: boolean = dealerSum > BLACKJACK;

    let resultText: string = "";

    myPlayer.hands.forEach((hand, index) => {
        if (hand.status === "Bust") {
            resultText += `Hand ${index + 1}: Bust `;
        } else {
            if (dealerBust) {
                resultText += `Hand ${index + 1}: Win! `;
                myPlayer.amountOfChips += hand.betAmount * 2;
            } else if (hand.sum > dealerSum) {
                resultText += `Hand ${index + 1}: Win! `;
                myPlayer.amountOfChips += hand.betAmount * 2;
            } else if (hand.sum === dealerSum) {
                resultText += `Hand ${index + 1}: Push `;
                myPlayer.amountOfChips += hand.betAmount;
            } else {
                resultText += `Hand ${index + 1}: Lose `;
            }
        }
    });

    if (resultLbl) resultLbl.textContent = resultText;
    updateUI(); // Final chip update
    mySetters.setGameEnd(true);
    setTimeout(() => {}, 1000);
    if (myPlayer.amountOfChips === 0) {
        mySetters.setLostEverything(true);
    }
}
