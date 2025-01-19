"use client";

import { useState } from "react";
import { LessonData, QuestionData } from "@/app/types/lesson";
import TrueFalseQuestion from "../questions/TrueFalseQuestion";
import MultipleChoiceQuestion from "../questions/MultipleChoiceQuestion";
import AnswerResponse from "../AnswerResponse";
import { useCoin } from "@/app/contexts/CoinContext";
import FillBlankQuestion from "../questions/FillBlankQuestion";
import LessonComplete from "./LessonComplete";

interface LessonProps {
    lesson: LessonData;
    onComplete: () => void;
    categoryTitle: string;
}

type AnswerType = boolean | number | string[];

export default function Lesson({ lesson, onComplete, categoryTitle }: LessonProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<AnswerType | null>(null);
    const [showResponse, setShowResponse] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [netCoinsChange, setNetCoinsChange] = useState(0);
    const { coins, setCoins } = useCoin();

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

    const getCorrectAnswerText = (question: QuestionData, userAnswer: AnswerType): { answers: string[]; count: number } | undefined => {
        if (question.type === "multiple-choice" && !checkAnswer(question, userAnswer)) {
            return { answers: [question.options[question.correctAnswer]], count: 1 };
        } else if (question.type === "fill-blank") {
            const userAnswers = userAnswer as string[];
            const blankSegments = question.segments.filter((seg) => seg.type === "blank");
            const incorrectAnswers = blankSegments
                .map((segment, index) => {
                    const userAns = userAnswers[index]?.toLowerCase().trim() || "";
                    const correctAns = segment.answer?.toLowerCase().trim() || "";
                    if (userAns !== correctAns) {
                        return correctAns;
                    }
                    return null;
                })
                .filter(Boolean) as string[];

            if (incorrectAnswers.length > 0) {
                return { answers: incorrectAnswers, count: incorrectAnswers.length };
            }
        }
        return undefined;
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
        const coinsChange = isCorrect ? 10 : -10;

        setCoins(Math.max(0, coins + coinsChange));
        setNetCoinsChange((prev) => prev + coinsChange);
    };

    const handleContinue = () => {
        if (currentQuestionIndex === lesson.questions.length - 1) {
            setIsComplete(true);
            return;
        }

        // Batch all state updates together
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResponse(false);
        setIsSubmitted(false);
    };

    if (isComplete) {
        return <LessonComplete lesson={lesson} categoryTitle={categoryTitle} coinsEarned={netCoinsChange} onComplete={onComplete} />;
    }

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
            <div className="mx-8 mb-16 mt-10 flex max-w-2xl flex-col items-center justify-center">
                <div className="w-full space-y-8 rounded-2xl bg-white p-8 shadow-lg">
                    {getQuestionComponent()}

                    <div className="mt-6">
                        <button onClick={handleSubmit} disabled={selectedAnswer === null || isSubmitted} className={`w-full rounded-xl py-3 text-base font-bold text-white transition-all ${selectedAnswer === null || isSubmitted ? "cursor-not-allowed bg-gray-300" : "bg-[#58CC02] shadow-[0_4px_0_0_#4CAD01] hover:bg-[#4CAD01] hover:shadow-[0_2px_0_0_#3B8C01] active:translate-y-[2px] active:shadow-[0_2px_0_0_#3B8C01]"}`}>
                            Check
                        </button>
                    </div>
                </div>
            </div>

            <AnswerResponse isCorrect={selectedAnswer !== null && checkAnswer(currentQuestion, selectedAnswer)} show={showResponse} onContinue={handleContinue} correctAnswer={selectedAnswer !== null ? getCorrectAnswerText(currentQuestion, selectedAnswer) : undefined} currentCoins={coins} />
        </>
    );
}
