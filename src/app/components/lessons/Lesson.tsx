"use client";

import { useState } from "react";
import { LessonData, QuestionData } from "@/app/types/lesson";
import TrueFalseQuestion from "../questions/TrueFalseQuestion";
import MultipleChoiceQuestion from "../questions/MultipleChoiceQuestion";
import AnswerResponse from "../AnswerResponse";
import { useCoin } from "@/app/contexts/CoinContext";
import FillBlankQuestion from "../questions/FillBlankQuestion";

interface LessonProps {
    lesson: LessonData;
}

export default function Lesson({ lesson }: LessonProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | string | string[] | null>(null);
    const [showResponse, setShowResponse] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { coins, setCoins } = useCoin();

    const currentQuestion = lesson.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / lesson.questions.length) * 100;

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setIsSubmitted(true);
        const isCorrect = checkAnswer(currentQuestion, selectedAnswer);
        setShowResponse(true);

        if (isCorrect) {
            setCoins(coins + 10);
        } else {
            if (coins <= 10) {
                setCoins(0);
            } else {
                setCoins(coins - 10);
            }
        }
    };

    const checkAnswer = (question: QuestionData, answer: number | string | string[]): boolean => {
        switch (question.type) {
            case "true-false":
                return answer === (question.correctAnswer ? 1 : 0);
            case "multiple-choice":
                return answer === question.correctAnswer;
            case "fill-blank":
                if (!Array.isArray(answer)) return false;
                return question.segments.every((segment, index) => segment.type === "text" || answer[index]?.toLowerCase().trim() === segment.answer?.toLowerCase().trim());
            default:
                return false;
        }
    };

    const handleContinue = () => {
        setShowResponse(false);
        setSelectedAnswer(null);
        setIsSubmitted(false);

        if (currentQuestionIndex < lesson.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            console.log("Lesson completed!");
        }
    };

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case "true-false":
                return <TrueFalseQuestion question={currentQuestion.question} truthy={currentQuestion.correctAnswer} onSelect={(value) => setSelectedAnswer(value ? 1 : 0)} selectedAnswer={selectedAnswer === null ? null : selectedAnswer === 1} disabled={isSubmitted} />;
            case "multiple-choice":
                return <MultipleChoiceQuestion question={currentQuestion.question} options={currentQuestion.options} onSelect={(value) => setSelectedAnswer(value)} selectedAnswer={typeof selectedAnswer === "number" ? selectedAnswer : null} disabled={isSubmitted} correctAnswer={isSubmitted ? currentQuestion.correctAnswer : undefined} showCorrectAnswer={isSubmitted} />;
            case "fill-blank":
                const blankCount = currentQuestion.segments.filter((s) => s.type === "blank").length;
                const answers = Array.isArray(selectedAnswer) ? selectedAnswer : new Array(blankCount).fill("");
                return <FillBlankQuestion question={currentQuestion.question} segments={currentQuestion.segments} onSelect={(values) => setSelectedAnswer(values)} selectedAnswers={answers} disabled={isSubmitted} showCorrectAnswer={isSubmitted} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="fixed left-0 right-0 top-0">
                <div className="h-2 w-full bg-gray-100">
                    <div className="h-full bg-[#58CC02] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="mx-auto mt-6 max-w-xl p-4">
                <div className="mb-4 text-sm font-semibold text-gray-500">
                    Question {currentQuestionIndex + 1} of {lesson.questions.length}
                </div>

                <div className="rounded-xl bg-white p-4 shadow-lg md:p-6">
                    {renderQuestion()}

                    <div className="mt-6">
                        <button onClick={handleSubmit} disabled={selectedAnswer === null || isSubmitted} className={`w-full rounded-xl py-3 text-base font-bold text-white transition-all ${selectedAnswer === null || isSubmitted ? "cursor-not-allowed bg-gray-300" : "bg-[#58CC02] shadow-[0_4px_0_0_#4CAF00] hover:bg-[#4CAF00] hover:shadow-[0_4px_0_0_#3B8C00] active:translate-y-[4px] active:bg-[#4CAF00] active:shadow-none"}`}>
                            Check
                        </button>
                    </div>
                </div>
            </div>

            <AnswerResponse isCorrect={checkAnswer(currentQuestion, selectedAnswer!)} show={showResponse} onContinue={handleContinue} correctAnswer={currentQuestion.type === "multiple-choice" && !checkAnswer(currentQuestion, selectedAnswer!) ? currentQuestion.options[currentQuestion.correctAnswer] : undefined} currentCoins={coins} />
        </>
    );
}
