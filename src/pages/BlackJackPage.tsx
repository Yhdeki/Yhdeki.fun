import UserContainer from "../components/UserContainer";
import "../pages/pages.css";
import BetContainer from "../components/BetContainer";
import ChipsDisplay from "../components/ChipsDisplay";
import NewRoundButton from "../components/NewRoundButton";
import HomeLink from "../components/HomeLink";
import { startGame } from "../Games/BlackjackGame";
import { useCasino } from "../Contexts/CasinoContext";
import { useGameState } from "../hooks/useGameState";
import { useEffect } from "react";
import { handleAction } from "../Games/BlackjackGame";
import BlackjackPlayer from "../Casino Components/Blackjack Components/BlackjackPLayer";
import BlackjackDealer from "../Casino Components/Blackjack Components/BlackjackDealer";

function BlackJackPage() {
	
    const {
        gameEnd,
        setGameEnd,
        availableOptions,
        setAvailableOptions,
        selectedOption,
        setSelectedOption,
    } = useGameState(["Hit", "Stand", "DoubleDown", "Split"]);

    const {
        casino,
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
        startGame(
            casino,
            new BlackjackPlayer(casino, playerChips),
            new BlackjackDealer(casino),
            {
                setPlayerChips,
                setAvailableOptions,
                setSelectedOption,
                setGameEnd,
                setPlayerHandSum,
                setDealerHandSum,
                setPlayerHandsCards,
                setDealerHandsCards,
                setLostEverything,
            },
        );
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
        <div id="blackjack-div" className="page-div">
            {!lostEverything && (
                <>
                    <div id="blackjack-game-div">
                        <h1>Blackjack Game!</h1>
                        <ChipsDisplay chips={playerChips} id="blackjack-info" />
                        <UserContainer
                            condition1={!gameEnd}
                            condition2={false}
                            id="dealer"
                            title="Dealer's hand"
                            hands={dealerHands}
                            availableOptions={availableOptions}
                            gameEnd={gameEnd}
                            setSelectedOption={() => {}}
                        />
                        <UserContainer
                            condition1={!gameEnd}
                            condition2={true}
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
                    <NewRoundButton gameEnd={gameEnd} onNewRound={newRound} />
                    <hr />
                </>
            )}
            {gameEnd &&<HomeLink />}
        </div>
    );
}

export default BlackJackPage;
