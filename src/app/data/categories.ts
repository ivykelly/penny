import { CategoryData } from "../types/lesson";

export const categories: { [key: string]: CategoryData } = {
    "1": {
        id: "basics",
        title: "Basic Concepts",
        lessons: [
            {
                id: "basics-1",
                title: "Investment Fundamentals",
                questions: [
                    {
                        type: "true-false",
                        question: "Is diversification an important investment principle?",
                        correctAnswer: true,
                    },
                    {
                        type: "multiple-choice",
                        question: "What is the main goal of investing?",
                        options: ["Quick profits", "Growing wealth over time", "Day trading", "Spending money"],
                        correctAnswer: 1,
                    },
                    {
                        type: "fill-blank",
                        question: "Complete the investment principle",
                        segments: [
                            { type: "text", content: "Time in the" },
                            { type: "blank", content: "", answer: "market", placeholder: "place" },
                            { type: "text", content: "beats" },
                            { type: "blank", content: "", answer: "timing", placeholder: "action" },
                            { type: "text", content: "the market." },
                        ],
                    },
                ],
            },
            {
                id: "basics-2",
                title: "Risk and Return",
                questions: [
                    {
                        type: "true-false",
                        question: "Higher risk always guarantees higher returns?",
                        correctAnswer: false,
                    },
                    // ... more questions
                ],
            },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "2": {
        id: "bonds",
        title: "Bonds",
        lessons: [
            /* existing lessons */
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    // ... other categories
};
