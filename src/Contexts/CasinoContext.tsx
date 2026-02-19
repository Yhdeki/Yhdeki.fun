import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import Casino from "../Casino Components/casinoClass";
import Player from "../Casino Components/playerClass";
import Dealer from "../Casino Components/dealerClass";
import type Hand from "../Casino Components/handClass";

// ─────────────────────────────────────────────
// This describes everything the context exposes
// ─────────────────────────────────────────────
interface CasinoContextType {
    // The class instances (for methods like shuffle, deal, etc.)
    casino: Casino;
    player: Player;
    dealer: Dealer;

	playerChips: number;
	
    // Setter functions – these are what the game logic calls
    setPlayerChips: (chips: number) => void;
    setPlayerHands: (hands: Hand[]) => void;
    setDealerHands: (hands: Hand[]) => void;

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
    const [playerChips, setPlayerChips] = useState<number>(100);
	const [playerHands, setPlayerHands] = useState<Hand[]>([]);
	const [dealerHands, setDealerHands] = useState<Hand[]>([]);

    // useCallback makes sure this function isn't recreated every render
    const resetRound = useCallback(() => {
        // Reset the class instances
        setPlayerHands([]);
        setDealerHands([]);
        casino.resetDeck(); // we'll add this method to Casino
    }, [casino, player, dealer]);

    return (
        <CasinoContext.Provider
            value={{
                casino,
                player,
                dealer,
				playerChips,
				setPlayerChips,
				setPlayerHands,
				setDealerHands,
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
