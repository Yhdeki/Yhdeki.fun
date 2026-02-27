import { Fragment } from "react";
import type Hand from "../Casino Components/handClass";
import HandContainer from "./HandContainer";
import MySelect from "./MySelect";

interface Props {
    id: string;
    title: string;
    hands: Hand[];
    condition1: boolean;
    condition2: boolean;
    availableOptions: string[];
    setSelectedOption: (option: string) => void;
}

function UserContainer(props: Props) {
    return (
        <Fragment>
            <div id={`${props.id}-div`} className="user-container">
                <label id={`${props.id}-lbl`} className="info-lbl">
                    {props.title}
                </label>
                <div className="hands-display">
                    {props.hands.map((hand, index) => (
                        <Fragment key={index}>
                            <HandContainer
                                title={(index + 1).toString()}
                                hand={hand}
                                handIndex={index}
                                condition1={props.condition1}
                                condition2={props.condition2}
                                availableOptions={props.availableOptions}
                                setSelectedOption={props.setSelectedOption}
                            />
                        </Fragment>
                    ))}
                </div>
                <MySelect
                    condition1={props.condition1}
                    condition2={props.condition2}
                    availableOptions={props.availableOptions}
                    handIndex={
                        props.hands.findIndex((h) => h.status === "Playing") + 1
                    }
                    setSelectedOption={props.setSelectedOption}
                />
            </div>
        </Fragment>
    );
}

export default UserContainer;
