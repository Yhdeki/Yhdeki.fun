interface Props {
	myId: string;
}

function BetContainer(props: Props) {
    return (
        <>
            Enter your bet:
            <input
                id={props.myId}
                className="bet-container"
                min="1"
                defaultValue="1"
            />
        </>
    );
}

export default BetContainer;
