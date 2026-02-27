import { Fragment } from "react/jsx-runtime";

interface Props {
    condition1: boolean;
    condition2: boolean;
    availableOptions: string[];
    handIndex: number;
    setSelectedOption: (option: string) => void;
}

function MySelect(props: Props) {
    return (
        props.condition1 &&
        props.condition2 && (
            <Fragment>
                <label className="info-lbl">
                    current hand: {props.handIndex}
                </label>
                <br />
                <select
                    value="none"
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
            </Fragment>
        )
    );
}

export default MySelect;
