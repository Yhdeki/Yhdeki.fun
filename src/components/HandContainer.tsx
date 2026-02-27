import type Hand from "../Casino Components/handClass";
import CardNode from "./Card";

interface Props {
	title: string;
    hand: Hand;
    handIndex: number;
    condition1: boolean;
    condition2: boolean;
    availableOptions: string[];
    setSelectedOption: (option: string) => void;
}

function HandContainer(props: Props) {
    return (
        <div className="hand-unit">
            <label className="info-lbl">
                {props.title}
            </label>
            <div className="hand-container">
                {props.hand.cards.map((card, i) => (
                    <CardNode
                        key={`${props.handIndex}-${i}-${card.suit}${card.rank}`}
                        suit={card.suit}
                        rank={card.rank}
                    />
                ))}
            </div>
        </div>
    );
}

export default HandContainer;
