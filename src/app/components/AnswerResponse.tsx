interface AnswerResponseProps {
    isCorrect: boolean;
    show: boolean;
    onContinue: () => void;
    correctAnswer?: string;
    currentCoins: number;
}

export default function AnswerResponse({ isCorrect, show, onContinue, correctAnswer, currentCoins }: AnswerResponseProps) {
    if (!show) return null;

    const getMessage = () => {
        if (isCorrect) {
            return "Correct! +10 coins";
        }

        if (currentCoins === 0) {
            return "Incorrect";
        }

        if (currentCoins <= 10) {
            return `Incorrect. -${currentCoins} coins`;
        }

        return "Incorrect. -10 coins";
    };

    return (
        <div className={`fixed bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"} ${isCorrect ? "bg-[#58CC02]" : "bg-[#FF4B4B]"}`}>
            <div className="mx-auto max-w-2xl">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{isCorrect ? "🎉" : "😕"}</span>
                            <span className="text-lg font-bold text-white">{getMessage()}</span>
                        </div>
                        {!isCorrect && correctAnswer && <span className="text-sm text-white opacity-90">Correct answer: {correctAnswer}</span>}
                    </div>
                    <button onClick={onContinue} className="rounded-xl bg-white px-6 py-2 font-bold text-[#58CC02] hover:bg-[#f7f7f7] active:bg-[#efefef]">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
