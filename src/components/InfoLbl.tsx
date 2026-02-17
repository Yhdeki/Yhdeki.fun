import { type PropsLbl } from "./PropsLbl";

function InfoLbl(props: PropsLbl) {
    return (
        <label id={props.id} className="info-lbl">
            {props.text}
        </label>
    );
}

export default InfoLbl;
