import ListGroup from "../components/ListGroup";
import "./pages.css";
import { useCasino } from "../Contexts/CasinoContext";

function HomePage() {
    const { playerChips, playerHands, dealerHands } = useCasino();
    playerHands.splice(0, playerHands.length);
    dealerHands.splice(0, dealerHands.length);
    return (
        <>
            <div key="1" className="ListGroup">
                <label
                    id="blackjack-info"
                    className="info-lbl"
                >{`chips: ${playerChips}`}</label>
                <ListGroup
                    items={["Poker", "Blackjack", "Baccarat"]}
                    title="Betting Games"
                />
            </div>
            <div key="2" className="ListGroup">
                <ListGroup
                    items={["Chinese Poker", "Chess"]}
                    title="Other Games"
                />
            </div>
        </>
    );
}

export default HomePage;
