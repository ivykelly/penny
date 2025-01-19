interface AnswerResponseProps {
    isCorrect: boolean;
    show: boolean;
    onContinue: () => void;
    correctAnswer?: { answers: string[]; count: number };
    currentCoins: number;
}

// Define the AnswerResponse component
export default function AnswerResponse({ isCorrect, show, onContinue, correctAnswer, currentCoins }: AnswerResponseProps) {
    if (!show) return null; // If the answer response is not shown, return null

    // Define the getMessage function to get the message for the user
    const getMessage = () => {
        if (isCorrect) { // If the user's answer is correct
            return "Correct! +10 coins!"; // Return the correct message
        }

        if (currentCoins === 0) { // If the user's coins are 0
            return "Incorrect."; // Return the incorrect message
        }

        if (currentCoins <= 10) { // If the user's coins are less than or equal to 10
            return `Incorrect. -${currentCoins} coins.`; // Return the incorrect message
        }

        return "Incorrect. -10 coins.";
    };

    return ( // Return the AnswerResponse component
        <div className={`fixed bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"} ${isCorrect ? "bg-[#58CC02]" : "bg-[#FF4B4B]"}`}>
            <div className="mx-auto max-w-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{isCorrect ? "🎉" : "😕"}</span>
                            <span className="text-lg font-bold text-white">{getMessage()}</span>
                        </div>
                        {!isCorrect && correctAnswer && <span className="text-sm text-white opacity-90">{`Correct answer${correctAnswer.count > 1 ? "s" : ""}: ${correctAnswer.answers.join(", ")}`}</span>}
                    </div>
                    <button onClick={onContinue} className="rounded-xl bg-white px-6 py-2 font-bold text-[#58CC02] hover:bg-[#f7f7f7] active:bg-[#efefef]">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
