interface FillBlankQuestionProps {
    question: string;
    segments: Array<{
        type: "text" | "blank";
        content: string;
        answer?: string;
        placeholder?: string;
    }>;
    selectedAnswer: string[];
    onSelect: (value: string[]) => void;
    isSubmitted: boolean;
}

export default function FillBlankQuestion(props: FillBlankQuestionProps) {
    const getInputStyle = (index: number) => {
        if (!props.isSubmitted) {
            return "border-gray-200 focus:border-[#58CC02] focus:ring-[#58CC02]";
        }

        const blankSegments = props.segments.filter((seg) => seg.type === "blank");
        const correctAnswer = blankSegments[index]?.answer || "";
        const userAnswer = props.selectedAnswer[index] || "";

        if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
            return "border-[#58CC02] bg-[#e5f6d3] focus:border-[#58CC02] focus:ring-[#58CC02]";
        }

        return "border-[#FF4B4B] bg-[#FFE8E8] focus:border-[#FF4B4B] focus:ring-[#FF4B4B]";
    };

    const handleChange = (index: number, value: string) => {
        // Find the index of this blank in the sequence of blanks
        const blankIndex = props.segments.filter((seg) => seg.type === "blank").findIndex((_, i) => i === index);

        if (blankIndex === -1) return;

        // Create new answers array with the updated value
        const newAnswers = [...props.selectedAnswer];
        newAnswers[blankIndex] = value;
        props.onSelect(newAnswers);
    };

    // Get the index of this blank among all blanks
    const getBlankIndex = (segmentIndex: number) => {
        let blankCount = 0;
        for (let i = 0; i < props.segments.length; i++) {
            if (props.segments[i].type === "blank") {
                if (i === segmentIndex) return blankCount;
                blankCount++;
            }
        }
        return -1;
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
                        {segment.type === "text" ? segment.content : <input type="text" value={props.selectedAnswer[getBlankIndex(index)] || ""} onChange={(e) => handleChange(getBlankIndex(index), e.target.value)} disabled={props.isSubmitted} placeholder={segment.placeholder || "Type here"} className={`w-28 rounded-lg border-2 px-2 py-1 text-center font-medium outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${getInputStyle(getBlankIndex(index))}`} autoComplete="off" spellCheck="false" />}
                    </span>
                ))}
            </div>
        </div>
    );
}
