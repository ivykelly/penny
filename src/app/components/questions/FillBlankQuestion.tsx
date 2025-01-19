import React from "react";

// Define the props for the FillBlankQuestion component
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

// Define the FillBlankQuestion component
export default function FillBlankQuestion(props: FillBlankQuestionProps) {
    // Define the getInputStyle function to get the input style for each blank
    const getInputStyle = (index: number) => {
        if (!props.isSubmitted) {
            return "border-gray-200 focus:border-[#58CC02] focus:ring-[#58CC02]";
        }
        // Try to get the correct answer for the current blank
        try {
            const blankSegments = props.segments.filter((seg) => seg.type === "blank");
            const correctAnswer = blankSegments[index]?.answer || "";
            const userAnswer = props.selectedAnswer[index];

            // Only perform validation if we have a user answer
            if (userAnswer && correctAnswer) {
                if (userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
                    return "border-[#58CC02] bg-[#e5f6d3] focus:border-[#58CC02] focus:ring-[#58CC02]";
                }
            }
        } catch (error) {
            console.error("Error in getInputStyle:", error);
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

    return ( // Return the FillBlankQuestion component
        <div className="flex flex-col items-center gap-4">
            <div className="text-center">
                <h1 className="mb-3 text-lg font-bold text-gray-700">Fill in the blanks</h1>
            </div>
            {/* Display the question segments */}
            <div className="w-full max-w-xl text-lg text-gray-700">
                {props.segments.map((segment, index) => (
                    <span key={index} className="inline">
                        {segment.type === "text" ? <span className="whitespace-pre-wrap">{segment.content}</span> : <input type="text" value={props.selectedAnswer[getBlankIndex(index)] || ""} onChange={(e) => handleChange(getBlankIndex(index), e.target.value)} disabled={props.isSubmitted} placeholder={segment.placeholder || "Type here"} className={`mx-1 inline-block w-28 rounded-lg border-2 px-2 py-1 text-center font-medium outline-none transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${getInputStyle(getBlankIndex(index))}`} autoComplete="off" spellCheck="false" />}
                    </span>
                ))}
            </div>
        </div>
    );
}
