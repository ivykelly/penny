"use client";

import { useState } from "react";
import { LessonData, QuestionData } from "@/app/types/lesson";
import TrueFalseQuestion from "../questions/TrueFalseQuestion";
import MultipleChoiceQuestion from "../questions/MultipleChoiceQuestion";
import AnswerResponse from "../AnswerResponse";
import { useCoin } from "@/app/contexts/CoinContext";
import FillBlankQuestion from "../questions/FillBlankQuestion";
import { useRouter } from "next/navigation";

interface LessonProps {
    lesson: LessonData;
    onComplete: () => void;
}

type AnswerType = boolean | number | string[];

export default function Lesson({ lesson, onComplete }: LessonProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<AnswerType | null>(null);
    const [showResponse, setShowResponse] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { coins, setCoins } = useCoin();
    const router = useRouter();

    const currentQuestion = lesson.questions[currentQuestionIndex];

    const checkAnswer = (question: QuestionData, answer: AnswerType): boolean => {
        switch (question.type) {
            case "true-false":
                return answer === question.correctAnswer;
            case "multiple-choice":
                return answer === question.correctAnswer;
            case "fill-blank": {
                const userAnswers = answer as string[];
                const blankAnswers = question.segments.filter((seg) => seg.type === "blank").map((seg) => seg.answer || "");

                // Ensure we have all answers
                if (userAnswers.length !== blankAnswers.length) return false;

                // Compare each answer
                return userAnswers.every((userAnswer, index) => {
                    const correctAnswer = blankAnswers[index];
                    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
                });
            }
            default:
                return false;
        }
    };

    const handleTrueFalseSelect = (value: boolean) => {
        setSelectedAnswer(value);
    };

    const handleMultipleChoiceSelect = (value: number) => {
        setSelectedAnswer(value);
    };

    const handleFillBlankSelect = (value: string[]) => {
        setSelectedAnswer(value);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setIsSubmitted(true);
        setShowResponse(true);

        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);

        if (isCorrect) {
            setCoins(coins + 10);
        } else {
            setCoins(Math.max(0, coins - 10));
        }
    };

    const handleContinue = () => {
        setSelectedAnswer(null);
        setShowResponse(false);
        setIsSubmitted(false);

        if (currentQuestionIndex === lesson.questions.length - 1) {
            onComplete();
            router.push("/");
            return;
        }

        setCurrentQuestionIndex((prev) => prev + 1);
    };

    if (currentQuestionIndex >= lesson.questions.length) {
        return null;
    }

    const getQuestionComponent = () => {
        switch (currentQuestion.type) {
            case "true-false":
                return <TrueFalseQuestion question={currentQuestion.question} selectedAnswer={selectedAnswer as boolean | null} onSelect={handleTrueFalseSelect} isSubmitted={isSubmitted} />;
            case "multiple-choice":
                return <MultipleChoiceQuestion question={currentQuestion.question} options={currentQuestion.options} selectedAnswer={selectedAnswer as number | null} onSelect={handleMultipleChoiceSelect} isSubmitted={isSubmitted} />;
            case "fill-blank":
                return <FillBlankQuestion question={currentQuestion.question} segments={currentQuestion.segments} selectedAnswer={(selectedAnswer as string[]) || []} onSelect={handleFillBlankSelect} isSubmitted={isSubmitted} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="mx-10 mt-16 flex max-w-2xl flex-col items-center justify-center">
                <div className="w-full space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                    {getQuestionComponent()}

                    <div className="mt-6">
                        <button onClick={handleSubmit} disabled={selectedAnswer === null || isSubmitted} className={`w-full rounded-xl py-3 text-base font-bold text-white transition-all ${selectedAnswer === null || isSubmitted ? "cursor-not-allowed bg-gray-300" : "bg-[#58CC02] shadow-[0_4px_0_0_#4CAD01] hover:bg-[#4CAD01] hover:shadow-[0_2px_0_0_#3B8C01] active:translate-y-[2px] active:shadow-[0_2px_0_0_#3B8C01]"}`}>
                            Check
                        </button>
                    </div>
                </div>
            </div>

            <AnswerResponse isCorrect={selectedAnswer !== null && checkAnswer(currentQuestion, selectedAnswer)} show={showResponse} onContinue={handleContinue} correctAnswer={currentQuestion.type === "multiple-choice" && selectedAnswer !== null && !checkAnswer(currentQuestion, selectedAnswer) ? currentQuestion.options[currentQuestion.correctAnswer] : undefined} currentCoins={coins} />
        </>
    );
}
