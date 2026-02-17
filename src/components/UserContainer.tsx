import Card from "../Casino Components/cardClass";
import CardNode from "./Card";
import InfoLbl from "./InfoLbl";

interface Props {
  id: string;
  title: string;
  cards: Card[];
}

function UserContainer(props: Props) {
  return (
    <div id={props.id} className="user-container">
      <InfoLbl id={props.id} text={props.title}/>
      <div className="card-container">
        {props.cards.map((card) => (
          <CardNode key={card.suit + card.rank} suit={card.suit} rank={card.rank} />
        ))}
      </div>
    </div>
  );
}

export default UserContainer;
