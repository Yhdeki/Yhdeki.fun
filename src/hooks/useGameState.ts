import { useState } from "react";

// ─────────────────────────────────────────────
// Extracts the 3 local state variables that
// every game page declares identically.
// Does NOT bundle useCasino() – call that separately.
// ─────────────────────────────────────────────
export function useGameState(defaultOptions: string[] = []) {
    const [gameEnd, setGameEnd] = useState<boolean>(true);
    const [availableOptions, setAvailableOptions] =
        useState<string[]>(defaultOptions);
    const [selectedOption, setSelectedOption] = useState<string>("");

    return {
        gameEnd,
        setGameEnd,
        availableOptions,
        setAvailableOptions,
        selectedOption,
        setSelectedOption,
    };
}
