import { Link } from "react-router-dom";
import UserContainer from "../components/UserContainer";
import "./pages.css";
import BetContainer from "../components/BetContainer";
import BlackjackGame from "../Games/BlackjackGame";
import { useCasino } from "../Contexts/CasinoContext";
import { useState } from "react";

function BlackJackPage() {
	const [numOfCardContainers, setNumOfCardContainers] = useState<number>(1);
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
        playerCards, // ← React state, UI reads this
        dealerCards, // ← React state, UI reads this
        setPlayerCards,
        setDealerCards,
        setPlayerChips,
        setPlayerSum,
        setDealerSum,
        resetRound,
    } = useCasino();

    const newGame = () => {
        BlackjackGame(casino, player, dealer, selectedOption, {
            setPlayerCards,
            setDealerCards,
            setPlayerChips,
            setPlayerSum,
            setDealerSum,
            setAvailableOptions,
            setSelectedOption,
			setGameEnd,
			setNumOfCardContainers,
        });
    };

    const newRound = () => {
        resetRound();
        newGame();
    };
    return (
        <div id="blackjack-div">
            <div id="blackjack-game-div">
                <h1>Blackjack Game!</h1>
                <label
                    id="blackjack-info"
                    className="info-lbl"
                >{`chips: ${player.amountOfChips}`}</label>
                <UserContainer
                    id="dealer"
                    title="Dealer's hand"
                    cards={dealerCards}
                    availableOptions={availableOptions}
					gameEnd={gameEnd}
					numOfCardContainers={numOfCardContainers}
					setSelectedOption={() => {}}
                />
                <UserContainer
                    id="player"
                    title="Your hand"
                    cards={playerCards}
                    availableOptions={availableOptions}
					gameEnd={gameEnd}
					numOfCardContainers={numOfCardContainers}
					setSelectedOption={setSelectedOption}
                />
                <label id="blackjack-error" className="error-lbl"></label>
                <label id="blackjack-result" className="result-lbl"></label>
            </div>
            <BetContainer myId="blackjack-bet" />
            <br />
            {gameEnd && (<button className="alone-button" onClick={newRound}>
                New Round
            </button>)}
            <hr />
            <Link to="/">
                <button className="alone-button">Home</button>
            </Link>
        </div>
    );
}

export default BlackJackPage;
