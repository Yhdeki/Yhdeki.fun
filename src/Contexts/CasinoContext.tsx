import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import Casino from "../Casino Components/casinoClass";
import Player from "../Casino Components/playerClass";
import Dealer from "../Casino Components/dealerClass";
import type Card from "../Casino Components/cardClass";

// ─────────────────────────────────────────────
// This describes everything the context exposes
// ─────────────────────────────────────────────
interface CasinoContextType {
    // The class instances (for methods like shuffle, deal, etc.)
    casino: Casino;
    player: Player;
    dealer: Dealer;

    // React state values – these are what the UI reads
    playerCards: Card[];
    dealerCards: Card[];
    playerChips: number;
    playerSum: number;
    dealerSum: number;

    // Setter functions – these are what the game logic calls
    setPlayerCards: (cards: Card[]) => void;
    setDealerCards: (cards: Card[]) => void;
    setPlayerChips: (chips: number) => void;
    setPlayerSum: (sum: number) => void;
    setDealerSum: (sum: number) => void;

    // Convenience reset for starting a new round
    resetRound: () => void;
}

// ─────────────────────────────────────────────
// Create the context (starts as undefined)
// ─────────────────────────────────────────────
const CasinoContext = createContext<CasinoContextType | undefined>(undefined);

// ─────────────────────────────────────────────
// The Provider wraps your whole app and holds
// all the state that React can actually track
// ─────────────────────────────────────────────
export function CasinoProvider({ children }: { children: ReactNode }) {
    // Create the class instances once (these never change)
    const [casino] = useState(() => new Casino());
    const [player] = useState(() => new Player(casino, 100));
    const [dealer] = useState(() => new Dealer(casino));

    // React state for values that need to trigger re-renders
    // These mirror the class properties, but React watches these
    const [playerCards, setPlayerCards] = useState<Card[]>([]);
    const [dealerCards, setDealerCards] = useState<Card[]>([]);
    const [playerChips, setPlayerChips] = useState<number>(100);
    const [playerSum, setPlayerSum] = useState<number>(0);
    const [dealerSum, setDealerSum] = useState<number>(0);

    // useCallback makes sure this function isn't recreated every render
    const resetRound = useCallback(() => {
        // Reset the class instances
        player.cards = [];
        player.sum = 0;
        player.aces = 0;
        dealer.cards = [];
        dealer.sum = 0;
        dealer.aces = 0;
        casino.resetDeck(); // we'll add this method to Casino

        // Reset the React state (this is what triggers the re-render)
        setPlayerCards([]);
        setDealerCards([]);
        setPlayerSum(0);
        setDealerSum(0);
    }, [casino, player, dealer]);

    return (
        <CasinoContext.Provider
            value={{
                casino,
                player,
                dealer,
                playerCards,
                dealerCards,
                playerChips,
                playerSum,
                dealerSum,
                setPlayerCards,
                setDealerCards,
                setPlayerChips,
                setPlayerSum,
                setDealerSum,
                resetRound,
            }}
        >
            {children}
        </CasinoContext.Provider>
    );
}

// ─────────────────────────────────────────────
// Custom hook – any component calls useCasino()
// to get access to all of the above
// ─────────────────────────────────────────────
export function useCasino(): CasinoContextType {
    const context = useContext(CasinoContext);
    if (!context) {
        throw new Error("useCasino must be used inside a <CasinoProvider>");
    }
    return context;
}