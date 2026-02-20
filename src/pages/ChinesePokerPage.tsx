import { useState } from "react";
import { useCasino } from "../Contexts/CasinoContext";
import UserContainer from "../components/UserContainer";

function ChinesePoker() {
    const [gameEnd, setGameEnd] = useState<boolean>(true);

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
    const newRound = () => {
        resetRound();
    };
    casino.deck = casino.deck;
    return (
        <div id="chinese-poker-div">
            {!lostEverything && (
                <>
                    <div id="chinese-poker-game-div"></div>
                    <h1>Chinese Poker Game!</h1>
                    <label
                        id="blackjack-info"
                        className="info-lbl"
                    >{`chips: ${playerChips}`}</label>
					<UserContainer />
                    {gameEnd && (
                        <button className="alone-button" onClick={newRound}>
                            New Round
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default ChinesePoker;
