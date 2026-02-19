import type Hand from "../Casino Components/handClass";
import HandContainer from "./HandContainer";
import InCasino from "../Casino Components/inCasinoClass";
import { Fragment } from "react/jsx-dev-runtime";
interface Props {
    id: string;
    title: string;
    hands: Hand[];
    availableOptions: string[];
    gameEnd: boolean;
    setSelectedOption: (option: string) => void;
    whoHasHand: InCasino;
}

function UserContainer(props: Props) {
    const handleClick = () => {
        const option = document.getElementById(
            `${props.id}-actions`,
        ) as HTMLSelectElement;
        props.setSelectedOption(option.value);
    };
    return (
        <>
            <div id={`${props.id}-div`} className="user-container">
                <label id={`${props.id}-lbl`} className="info-lbl">
                    {props.title}
                </label>
                {props.hands.map((hand, index) => (
                    <Fragment key={index}>
                        <HandContainer
                            myId={props.id}
                            whoHasHand={props.whoHasHand}
                            handIndex={index}
                            gameEnd={props.gameEnd}
                            setSelectedOption={props.setSelectedOption}
                            availableOptions={props.availableOptions}
                        />
                        {props.id === "player" && <button
                            id={`${props.id}-button`}
                            className="alone-button"
                            onClick={handleClick}
                        >
                            Submit
                        </button>}
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default UserContainer;
