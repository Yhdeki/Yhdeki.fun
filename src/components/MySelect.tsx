interface Props {
    condition1: boolean;
    condition2: boolean;
    availableOptions: string[];
    setSelectedOption: (option: string) => void;
}

function MySelect(props: Props) {
    return (
        props.condition1 &&
        props.condition2 && (
            <select
                value="none"
                id={"choose-chinese-poker-hand"}
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
        )
    );
}

export default MySelect;
