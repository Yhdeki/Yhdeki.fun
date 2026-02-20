import type Hand from "../Casino Components/handClass";
import CardNode from "./Card";

interface Props {
    myId: string;
    hand: Hand;
    handIndex: number;
    gameEnd: boolean;
    availableOptions: string[];
    setSelectedOption: (option: string) => void;
}
function HandContainer(props: Props) {
    return (
        <>
            <div className="hand-container">
                {props.hand.cards.map((card, i) => (
                    <CardNode
                        key={`${props.handIndex}-${i}-${card.suit}${card.rank}`}
                        suit={card.suit}
                        rank={card.rank}
                    />
                ))}
            </div>
            {!props.gameEnd && props.myId === "player" && (
                <select
                    value="none"
                    id={`${props.myId}-actions`}
                    className="game-select"
                    onChange={(e) => {
                        props.setSelectedOption(e.target.value);
                    }}
                >
                    <option value="none" disabled>
                        -- Select --
                    </option>
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

export default HandContainer;
