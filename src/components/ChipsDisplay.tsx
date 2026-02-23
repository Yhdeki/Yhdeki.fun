interface Props {
    chips: number;
    id?: string;
}

function ChipsDisplay({ chips, id = "chips-info" }: Props) {
    return (
        <label id={id} className="info-lbl">
            {`chips: ${chips}`}
        </label>
    );
}

export default ChipsDisplay;
