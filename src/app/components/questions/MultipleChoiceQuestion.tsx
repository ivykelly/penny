interface MultipleChoiceQuestionProps {
    question: string;
    options: string[];
    selectedAnswer: number | null;
    onSelect: (value: number) => void;
    isSubmitted: boolean;
}

// Define the MultipleChoiceQuestion component
export default function MultipleChoiceQuestion(props: MultipleChoiceQuestionProps) {
    const getButtonStyle = (index: number) => {
        if (!props.isSubmitted) { // If the user has not submitted their answer
            return props.selectedAnswer === index ? "border-[#58CC02] bg-[#e5f6d3]" : "border-gray-200 text-gray-700 hover:border-[#58CC02] hover:bg-[#e5f6d3]";
        }

        if (props.selectedAnswer === index) { // If the user's selected answer is the same as the index
            return "border-[#58CC02] bg-[#e5f6d3]"; // Return the correct answer style
        }

        return "border-gray-200 text-gray-700 opacity-50"; 
    };

    return ( // Return the MultipleChoiceQuestion component
        <div className="flex flex-col items-center gap-4">
            <div className="text-center">
                <h1 className="mb-3 text-lg font-bold text-gray-700">Select the correct answer</h1>
                <p className="text-base text-gray-600">{props.question}</p>
            </div>
            {/* Display the options */}
            <div className="flex w-full max-w-md flex-col gap-3">
                {props.options.map((option, index) => (
                    <button key={index} onClick={() => props.onSelect(index)} disabled={props.isSubmitted} className={`w-full rounded-lg border-2 px-4 py-2.5 text-left text-base font-semibold transition-colors duration-200 ${props.isSubmitted ? "cursor-not-allowed" : ""} ${getButtonStyle(index)}`}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
