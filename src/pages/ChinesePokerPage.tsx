import { useCasino } from "../Contexts/CasinoContext";
import { useGameState } from "../hooks/useGameState";
import UserContainer from "../components/UserContainer";
import ChipsDisplay from "../components/ChipsDisplay";
import NewRoundButton from "../components/NewRoundButton";
import { startGame } from "../Games/ChinesePoker";
import HomeLink from "../components/HomeLink";
import PokerPlayer from "../Casino Components/Poker Components/PokerPlayer";
import PokerDealer from "../Casino Components/Poker Components/PokerDealer";
import MySelect from "../components/MySelect";

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
        startGame(
            casino,
            new PokerPlayer(player.casino, playerChips),
            new PokerDealer(casino),
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

    return (
        <div id="chinese-poker-div" className="page-div">
            {!lostEverything && (
                <>
                    <div id="chinese-poker-game-div"></div>
                    <h1>Chinese Poker Game!</h1>
                    <ChipsDisplay chips={playerChips} id="blackjack-info" />
                    <div className="hand-connector">
                        <UserContainer
                            condition1={false}
                            condition2={false}
                            id="dealer"
                            title="Opponent's side"
                            hands={dealerHands}
                            availableOptions={availableOptions}
                            gameEnd={gameEnd}
                            setSelectedOption={() => {}}
                        />
                    </div>

                    <div className="hand-connector">
                        <UserContainer
                            condition1={false}
                            condition2={false}
                            id="player"
                            title="Your side"
                            hands={playerHands}
                            availableOptions={[]}
                            gameEnd={gameEnd}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>
                    <MySelect
                        condition1={!gameEnd}
                        condition2={true}
                        availableOptions={availableOptions}
                        setSelectedOption={setSelectedOption}
                    />

                    <NewRoundButton gameEnd={gameEnd} onNewRound={newRound} />

                    <hr />
                </>
            )}
            <HomeLink />
        </div>
    );
}

export default ChinesePoker;
