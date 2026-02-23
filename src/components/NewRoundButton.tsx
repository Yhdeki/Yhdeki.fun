interface Props {
    gameEnd: boolean;
    onNewRound: () => void;
}

function NewRoundButton({ gameEnd, onNewRound }: Props) {
    if (!gameEnd) return null;
    return (
        <button className="alone-button" onClick={onNewRound}>
            New Round
        </button>
    );
}

export default NewRoundButton;
