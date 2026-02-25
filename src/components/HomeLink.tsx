import { Link } from "react-router-dom";
import { useGameState } from "../hooks/useGameState";

function HomeLink() {
    const { gameEnd } = useGameState();
    return (
        <Link to="/">
            <button className="alone-button">Home</button>
        </Link>
    );
}

export default HomeLink;
