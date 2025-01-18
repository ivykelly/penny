interface FillBlankQuestionProps {
    question: string;
    segments: Array<{
        type: "text" | "blank";
        content: string;
        answer?: string;
        placeholder?: string;
    }>;
    onSelect: (answers: string[]) => void;
    selectedAnswers: string[];
    disabled: boolean;
    showCorrectAnswer?: boolean;
}

export default function FillBlankQuestion(props: FillBlankQuestionProps) {
    const getInputStyle = (index: number) => {
        if (!props.disabled || !props.showCorrectAnswer) {
            return "border-gray-200 focus:border-[#58CC02] focus:ring-[#58CC02]";
        }

        const answer = props.segments[index].answer;
        const selected = props.selectedAnswers[index];

        if (selected?.toLowerCase().trim() === answer?.toLowerCase().trim()) {
            return "border-[#58CC02] bg-[#e5f6d3] focus:border-[#58CC02] focus:ring-[#58CC02]";
        }

        return "border-[#FF4B4B] bg-[#FFE8E8] focus:border-[#FF4B4B] focus:ring-[#FF4B4B]";
    };

    const handleChange = (index: number, value: string) => {
        const newAnswers = [...props.selectedAnswers];
        newAnswers[index] = value;
        props.onSelect(newAnswers);
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="text-center">
                <h1 className="mb-3 text-lg font-bold text-gray-700">Fill in the blanks</h1>
                <p className="text-base text-gray-600">{props.question}</p>
            </div>

            <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-x-2 gap-y-3 text-base">
                {props.segments.map((segment, index) => (
                    <span key={index} className="inline-flex items-center">
                        {segment.type === "text" ? segment.content : <input type="text" value={props.selectedAnswers[index] || ""} onChange={(e) => handleChange(index, e.target.value)} disabled={props.disabled} placeholder={segment.placeholder || "Type here"} className={`w-28 rounded-lg border-2 px-2 py-1 text-center font-medium outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${getInputStyle(index)}`} autoComplete="off" spellCheck="false" />}
                    </span>
                ))}
            </div>

            {props.disabled && props.showCorrectAnswer && (
                <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {props.segments.map((segment, index) => {
                        if (segment.type === "blank") {
                            const isCorrect = props.selectedAnswers[index]?.toLowerCase().trim() === segment.answer?.toLowerCase().trim();
                            if (!isCorrect) {
                                return (
                                    <div key={index} className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F1] px-3 py-1 text-sm">
                                        <span className="font-medium text-[#FF4B4B]">{segment.placeholder}:</span>
                                        <span className="text-[#FF4B4B]">{segment.answer}</span>
                                    </div>
                                );
                            }
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
}
