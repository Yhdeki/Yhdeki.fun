import React, { Fragment } from "react";
import type Hand from "../Casino Components/handClass";
import HandContainer from "./HandContainer";

interface Props {
    id: string;
    title: string;
    hands: Hand[];
    availableOptions: string[];
    gameEnd: boolean;
    condition1: boolean;
    condition2: boolean;
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
                                myId={props.id}
                                hand={hand}
                                handIndex={index}
                                gameEnd={props.gameEnd}
                                condition1={props.condition1}
                                condition2={props.condition2}
                                setSelectedOption={props.setSelectedOption}
                                availableOptions={props.availableOptions}
                            />
                        </Fragment>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

export default UserContainer;
