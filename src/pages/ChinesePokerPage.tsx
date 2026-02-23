import { useCasino } from "../Contexts/CasinoContext";
import { useGameState } from "../hooks/useGameState";
import UserContainer from "../components/UserContainer";
import ChipsDisplay from "../components/ChipsDisplay";
import NewRoundButton from "../components/NewRoundButton";
import { startGame } from "../Games/ChinesePoker";

function ChinesePoker() {
    const {
        gameEnd,
        setGameEnd,
        availableOptions,
        setAvailableOptions,
        selectedOption,
        setSelectedOption,
    } = useGameState(["1", "2", "3", "4", "5"]);

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
    };
    casino.deck = casino.deck;
    return (
        <div id="chinese-poker-div">
            {!lostEverything && (
                <>
                    <div id="chinese-poker-game-div"></div>
                    <h1>Chinese Poker Game!</h1>
                    <ChipsDisplay chips={playerChips} id="blackjack-info" />
                    <UserContainer
                        id="dealer"
                        title="Opponent's side"
                        hands={dealerHands}
                        availableOptions={availableOptions}
                        gameEnd={gameEnd}
                        setSelectedOption={() => {}}
                    />
                    <UserContainer
                        id="player"
                        title="Your side"
                        hands={playerHands}
                        availableOptions={[]}
                        gameEnd={gameEnd}
                        setSelectedOption={setSelectedOption}
                    />

                    <NewRoundButton gameEnd={gameEnd} onNewRound={newRound} />
                </>
            )}
        </div>
    );
}

export default ChinesePoker;
