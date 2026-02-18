import ListGroup from "../components/ListGroup";
import "./pages.css";

function HomePage() {
  return (
    <>
      <div key="1" className="ListGroup">
        <ListGroup
          items={["Poker", "Blackjack", "Baccarat"]}
          title="Betting Games"
        />
      </div>
      <div key="2" className="ListGroup">
        <ListGroup items={["Chinese Poker", "Chess"]} title="Other Games" />
      </div>
    </>
  );
}

export default HomePage;
