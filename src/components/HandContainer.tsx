import InCasino from "../Casino Components/inCasinoClass";
import CardNode from "./Card";

interface Props {
    myId: string;
    whoHasHand: InCasino;
    handIndex: number;
    gameEnd: boolean;
    availableOptions: string[];
    setSelectedOption: (option: string) => void;
}
function HandContainer(props: Props) {
    return (
        <>
            <div className="hand-container">
                <label className="info-lbl"></label>
                {props.whoHasHand.hands[props.handIndex].cards.map(
                    (card, i) => (
                        <CardNode
                            key={`${props.handIndex}-${i}-${card.suit}${card.rank}`}
                            suit={card.suit}
                            rank={card.rank}
                        />
                    ),
                )}
            </div>
            {!props.gameEnd && props.myId === "player" && (
                <select
                    defaultValue=" "
                    id={`${props.myId}-actions`}
                    className="game-select"
                    onChange={(target) => {
                        props.setSelectedOption(target.target.value);
                    }}
                >
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
