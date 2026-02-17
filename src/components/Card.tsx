import "./components.css";

interface Props {
  suit: string;
  rank: string;
}

function Card(props: Props) {
  const pathImgCard: string =
    "/src/assets/playing_cards/" +
    props.suit +
    "/" +
    props.suit.toLowerCase() +
    "_" +
    props.rank +
    ".png";

  return (
    <img className="card" src={pathImgCard} alt={props.rank + " of " + props.suit} />
  );
}

export default Card;
