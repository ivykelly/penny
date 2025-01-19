interface TrueFalseQuestionProps {
    question: string;
    selectedAnswer: boolean | null;
    onSelect: (value: boolean) => void;
    isSubmitted: boolean;
}

// Define the TrueFalseQuestion component
export default function TrueFalseQuestion(props: TrueFalseQuestionProps) {
    return ( // Return the TrueFalseQuestion component
        <div className="flex flex-col items-center gap-4">
            <div className="text-center">
                <h1 className="mb-3 text-lg font-bold text-gray-700">Select the correct answer</h1>
                <p className="text-base text-gray-600">{props.question}</p>
            </div>

            {/* Display the options */}
            <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <button onClick={() => props.onSelect(true)} disabled={props.isSubmitted} className={`flex-1 rounded-lg border-2 px-6 py-2.5 text-base font-semibold transition-colors duration-200 ${props.isSubmitted ? "cursor-not-allowed opacity-50" : ""} ${props.selectedAnswer === true ? "border-[#58CC02] bg-[#e5f6d3]" : "border-gray-200 text-gray-700 hover:border-[#58CC02] hover:bg-[#e5f6d3]"}`}>
                    True
                </button>
                <button onClick={() => props.onSelect(false)} disabled={props.isSubmitted} className={`flex-1 rounded-lg border-2 px-6 py-2.5 text-base font-semibold transition-colors duration-200 ${props.isSubmitted ? "cursor-not-allowed opacity-50" : ""} ${props.selectedAnswer === false ? "border-[#58CC02] bg-[#e5f6d3]" : "border-gray-200 text-gray-700 hover:border-[#58CC02] hover:bg-[#e5f6d3]"}`}>
                    False
                </button>
            </div>
        </div>
    );
}
