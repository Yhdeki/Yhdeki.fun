import type Hand from "../Casino Components/handClass";
import CardNode from "./Card";
import MySelect from "./MySelect";

interface Props {
    myId: string;
    hand: Hand;
    handIndex: number;
    gameEnd: boolean;
    availableOptions: string[];
    condition1: boolean;
    condition2: boolean;
    setSelectedOption: (option: string) => void;
}
function HandContainer(props: Props) {
    return (
        <div className="hand-unit">
            <div className="hand-container">
                {props.hand.cards.map((card, i) => (
                    <CardNode
                        key={`${props.handIndex}-${i}-${card.suit}${card.rank}`}
                        suit={card.suit}
                        rank={card.rank}
                    />
                ))}
            </div>
            <MySelect
                condition1={props.condition1}
                condition2={props.condition2}
                availableOptions={props.availableOptions}
                setSelectedOption={props.setSelectedOption}
            />
        </div>
    );
}

export default HandContainer;
