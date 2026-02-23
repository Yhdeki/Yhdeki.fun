import { Link } from "react-router-dom";

function HomeLink() {
    return (
        <Link to="/">
            <button className="alone-button">Home</button>
        </Link>
    );
}

export default HomeLink;
