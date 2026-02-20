import { Link } from "react-router-dom";
import UserContainer from "../components/UserContainer";
import "./pages.css";
import BetContainer from "../components/BetContainer";
import { startGame } from "../Games/BlackjackGame";
import { useCasino } from "../Contexts/CasinoContext";
import { useState, useEffect } from "react";
import { handleAction } from "../Games/BlackjackGame";

function BlackJackPage() {
    const [gameEnd, setGameEnd] = useState<boolean>(true);
    const [availableOptions, setAvailableOptions] = useState<string[]>([
        "Hit",
        "Stand",
        "DoubleDown",
        "Split",
    ]);
    const [selectedOption, setSelectedOption] = useState<string>("");
    // Pull BOTH the class instances (for game logic)
    // AND the React state values (for displaying in the UI)
    const {
        casino,
        player,
        dealer,
        playerChips,
        playerHands,
        dealerHands,
        lostEverything,
        setPlayerChips,
        setPlayerHandSum,
        setDealerHandSum,
        setPlayerHandsCards,
        setDealerHandsCards,
        setLostEverything,
        resetRound,
    } = useCasino();

    const newGame = () => {
        startGame(casino, player, dealer, {
            setPlayerChips,
            setAvailableOptions,
            setSelectedOption,
            setGameEnd,
            setPlayerHandSum,
            setDealerHandSum,
            setPlayerHandsCards,
            setDealerHandsCards,
            setLostEverything,
        });
    };

    const newRound = () => {
        resetRound();
        newGame();
    };

    // Add this:
    useEffect(() => {
        if (selectedOption && selectedOption !== " " && !gameEnd) {
            handleAction(selectedOption);
            setSelectedOption(" "); // reset after action
        }
    }, [selectedOption]);

    return (
        <div id="blackjack-div">
            {!lostEverything && (
                <>
                    <div id="blackjack-game-div">
                        <h1>Blackjack Game!</h1>
                        <label
                            id="blackjack-info"
                            className="info-lbl"
                        >{`chips: ${playerChips}`}</label>
                        <UserContainer
                            id="dealer"
                            title="Dealer's hand"
                            hands={dealerHands}
                            availableOptions={availableOptions}
                            gameEnd={gameEnd}
                            setSelectedOption={() => {}}
                        />
                        <UserContainer
                            id="player"
                            title="Your hand"
                            hands={playerHands}
                            availableOptions={availableOptions}
                            gameEnd={gameEnd}
                            setSelectedOption={setSelectedOption}
                        />
                        <label
                            id="blackjack-error"
                            className="error-lbl"
                        ></label>
                        <label
                            id="blackjack-result"
                            className="result-lbl"
                        ></label>
                    </div>
                    <BetContainer myId="blackjack-bet" />
                    <br />
                    {gameEnd && (
                        <button className="alone-button" onClick={newRound}>
                            New Round
                        </button>
                    )}
                    <hr />
                </>
            )}
            <Link to="/">
                <button className="alone-button">Home</button>
            </Link>
        </div>
    );
}

export default BlackJackPage;
