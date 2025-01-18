interface TrueFalseQuestion {
    question: string;
    truthy: boolean;
}

export default function TrueFalseQuestion(props: TrueFalseQuestion) {
    return (
        <div className="">
            <h1>Select the correct answer.</h1>
            <p>{props.question}</p>
            <button className="">True</button>
            <button className="">False</button>
        </div>
    );
}
