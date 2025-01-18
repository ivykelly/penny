"use client";

import Lesson from "../components/lessons/Lesson";

// Example lesson data
const sampleLesson = {
    id: "basics-1",
    title: "Basics 1",
    questions: [
        {
            type: "true-false" as const,
            question: "Is this the first question?",
            correctAnswer: true,
        },
        {
            type: "multiple-choice" as const,
            question: "Which of these is correct?",
            options: ["First option", "Second option", "Third option", "Fourth option"],
            correctAnswer: 2,
        },
        {
            type: "fill-blank" as const,
            question: "Complete the sentence",
            segments: [
                { type: "text", content: "The" },
                { type: "blank", content: "", answer: "quick", placeholder: "adjective" },
                { type: "text", content: "brown" },
                { type: "blank", content: "", answer: "fox", placeholder: "animal" },
                { type: "text", content: "jumps over the" },
                { type: "blank", content: "", answer: "lazy", placeholder: "adjective" },
                { type: "text", content: "dog." },
            ],
        },
    ],
};

export default function LessonLayout() {
    return <Lesson lesson={sampleLesson} />;
}
