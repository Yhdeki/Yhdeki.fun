import type { PropsLbl } from "./PropsLbl";

function ErrorLbl(props: PropsLbl) {
	return <label id={props.id} className="error-lbl">{props.text}</label>;
}

export default ErrorLbl;
