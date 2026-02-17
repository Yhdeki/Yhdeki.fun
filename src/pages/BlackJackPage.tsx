import { Link } from "react-router-dom";
import UserContainer from "../components/UserContainer";
import "./pages.css";
import BetContainer from "../components/BetContainer";
import BlackjackGame from "../Games/BlackjackGame";
import { useCasino } from "../Contexts/CasinoContext";
import InfoLbl from "../components/InfoLbl";
import ErrorLbl from "../components/ErrorLbl";

function BlackJackPage() {
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

    const handleClick = () => {
        BlackjackGame(casino, player, dealer, {
            setPlayerCards,
            setDealerCards,
            setPlayerChips,
            setPlayerSum,
            setDealerSum,
        });
    };

    return (
        <div id="blackjack-div">
            <div id="blackjack-game-div">
                <h1>Blackjack Game!</h1>
                <InfoLbl
                    id="blackjack-info"
                    text={`chips: ${player.amountOfChips}`}
                />
                <UserContainer
                    id="dealer"
                    title="Dealer's hand"
                    cards={dealerCards}
                />
                <UserContainer
                    id="player"
                    title="Your hand"
                    cards={playerCards}
                />
                <ErrorLbl id="error-lbl" text=""/>
            </div>
            <BetContainer myId="blackjack-bet" />
            <br />
            <button className="alone-button" onClick={handleClick}>
                Deal
            </button>
            <button className="alone-button" onClick={resetRound}>
                New Round
            </button>
            <hr />
            <Link to="/">
                <button className="alone-button">Home</button>
            </Link>
        </div>
    );
}

export default BlackJackPage;
