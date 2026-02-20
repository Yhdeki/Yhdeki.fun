import type Hand from "../Casino Components/handClass";
import HandContainer from "./HandContainer";
import { Fragment } from "react/jsx-dev-runtime";
interface Props {
    id: string;
    title: string;
    hands: Hand[];
    availableOptions: string[];
    gameEnd: boolean;
    setSelectedOption: (option: string) => void;
}

function UserContainer(props: Props) {
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
                            hand={hand}
                            handIndex={index}
                            gameEnd={props.gameEnd}
                            setSelectedOption={props.setSelectedOption}
                            availableOptions={props.availableOptions}
                        />
                    </Fragment>
                ))}
            </div>
        </>
    );
}

export default UserContainer;
