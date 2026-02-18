import Card from "../Casino Components/cardClass";
import CardNode from "./Card";
interface Props {
    id: string;
    title: string;
    cards: Card[];
    availableOptions: string[];
    gameEnd: boolean;
    numOfCardContainers: number;
	setSelectedOption: (option: string) => void;
}

function UserContainer(props: Props) {
    return (
        <>
            <div id={props.id} className="user-container">
                <label id={props.id} className="info-lbl">
                    {props.title}
                </label>
                {Array.from({ length: props.numOfCardContainers }).map(
                    (_, index) => (
                        <div key={index} className="card-container">
                            {props.cards.map((card) => (
                                <CardNode
                                    key={card.suit + card.rank}
                                    suit={card.suit}
                                    rank={card.rank}
                                />
                            ))}
                        </div>
                    ),
                )}
            </div>
            {!props.gameEnd && props.id == "player" && (
                <select id={`${props.id}-actions`} className="game-select" onChange={(value) => props.setSelectedOption(value.target.value)}>
                    {props.availableOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}

export default UserContainer;
