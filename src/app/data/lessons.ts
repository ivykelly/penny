import { LessonData } from "../types/lesson";

export const lessons: { [key: string]: LessonData } = {
    basics: {
        id: "basics-1",
        title: "Basic Concepts",
        questions: [
            {
                type: "true-false",
                question: "Is compound interest better than simple interest?",
                correctAnswer: true,
            },
            {
                type: "multiple-choice",
                question: "Which of these is a good investment practice?",
                options: ["Putting all money in one stock", "Investing only when market is high", "Diversifying your portfolio", "Day trading without research"],
                correctAnswer: 2,
            },
            {
                type: "fill-blank",
                question: "Complete the investment principle",
                segments: [
                    { type: "text", content: "The higher the" },
                    { type: "blank", content: "", answer: "risk", placeholder: "factor" },
                    { type: "text", content: ", the higher the potential" },
                    { type: "blank", content: "", answer: "return", placeholder: "outcome" },
                    { type: "text", content: "." },
                ],
            },
        ],
    },
    stocks: {
        id: "stocks-1",
        title: "Stock Market",
        questions: [
            {
                type: "true-false",
                question: "Do stocks represent ownership in a company?",
                correctAnswer: true,
            },
            {
                type: "multiple-choice",
                question: "What is a bull market?",
                options: ["When stock prices are falling", "When stock prices are rising", "When the market is closed", "When trading is suspended"],
                correctAnswer: 1,
            },
            {
                type: "fill-blank",
                question: "Complete the stock market term",
                segments: [
                    { type: "text", content: "A" },
                    { type: "blank", content: "", answer: "dividend", placeholder: "payment" },
                    { type: "text", content: "is a portion of company" },
                    { type: "blank", content: "", answer: "profits", placeholder: "earnings" },
                    { type: "text", content: "paid to shareholders." },
                ],
            },
        ],
    },
    crypto: {
        id: "crypto-1",
        title: "Cryptocurrency",
        questions: [
            {
                type: "true-false",
                question: "Is Bitcoin a decentralized currency?",
                correctAnswer: true,
            },
            {
                type: "multiple-choice",
                question: "What is blockchain?",
                options: ["A type of cryptocurrency", "A central bank", "A distributed ledger technology", "A trading platform"],
                correctAnswer: 2,
            },
            {
                type: "fill-blank",
                question: "Complete the crypto concept",
                segments: [
                    { type: "text", content: "A" },
                    { type: "blank", content: "", answer: "wallet", placeholder: "storage" },
                    { type: "text", content: "stores your crypto" },
                    { type: "blank", content: "", answer: "keys", placeholder: "access" },
                    { type: "text", content: "securely." },
                ],
            },
        ],
    },
};
