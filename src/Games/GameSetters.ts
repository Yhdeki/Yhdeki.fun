import type Hand from "../Casino Components/handClass";

// ─────────────────────────────────────────────
// Shared setter bag that every game's startGame()
// receives from the page component.
// ─────────────────────────────────────────────
export interface GameSetters {
    setPlayerHandSum: (hands: Hand[]) => void;
    setDealerHandSum: (hands: Hand[]) => void;
    setPlayerHandsCards: (hands: Hand[]) => void;
    setDealerHandsCards: (hands: Hand[]) => void;
    setPlayerChips: (chips: number) => void;
    setAvailableOptions: (options: string[]) => void;
    setSelectedOption: (option: string) => void;
    setLostEverything: (lostEverything: boolean) => void;
    setGameEnd: (gameEnd: boolean) => void;
}
