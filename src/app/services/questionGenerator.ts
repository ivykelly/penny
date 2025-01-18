import { QuestionData, LessonData } from "../types/lesson";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY;

async function generateQuestionsWithGemini(topic: string, lessonTitle: string): Promise<QuestionData[]> {
    if (!API_KEY) {
        throw Error("api key env var not defined");
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
            Generate 7 educational questions about ${topic} focusing on ${lessonTitle}.
            Make questions educational and progressively more challenging. It should start off very easy!
            Create a mix of question types:

            2 True/False questions:
            - Make them clear and unambiguous
            - Include explanation for the correct answer

            3 Multiple Choice questions:
            - Provide 4 options per question
            - One clear correct answer
            - Plausible but incorrect distractors
            - Progressive difficulty

            2 Fill-in-the-blank questions:
            - Create sentences with 1-2 blanks
            - Clear context for the correct answer
            - Appropriate difficulty level

            Format the response as a JSON array matching this structure:
            {
            "type": "true-false" | "multiple-choice" | "fill-blank",
            "question": "string",
            "correctAnswer": boolean | number | string,
            // for multiple-choice:
            "options": string[],
            // for fill-blank:
            "segments": Array<{
                type: "text" | "blank",
                content: string,
                answer?: string,
                placeholder?: string
            }>
            }
            `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        let responseText = response.text();

        // Try to extract JSON if response is wrapped in backticks
        if (responseText.includes("```json")) {
            responseText = responseText.split("```json")[1].split("```")[0];
        } else if (responseText.startsWith("```") && responseText.endsWith("```")) {
            responseText = responseText.slice(3, -3);
        }

        // Clean up any remaining whitespace
        responseText = responseText.trim();

        const questions = JSON.parse(responseText);

        if (!Array.isArray(questions)) {
            throw new Error("Gemini response is not an array");
        }

        if (questions.length !== 7) {
            throw new Error(`Expected 7 questions but got ${questions.length}`);
        }

        return validateQuestions(questions);
    } catch (error) {
        console.error("Error generating questions:", error);
        if (error instanceof SyntaxError) {
            throw new Error("Failed to parse Gemini response as JSON. Please try again.");
        }
        throw new Error("Failed to generate questions with Gemini: " + (error as Error).message);
    }
}

export async function generateLesson(categoryId: string, lessonIndex: number): Promise<LessonData> {
    const topics = {
        "1": {
            name: "Basic Concepts",
            lessons: ["Investment Fundamentals", "Risk and Return", "Market Analysis"],
        },
        "2": {
            name: "Bonds",
            lessons: ["Bond Fundamentals", "Types of Bonds", "Bond Trading Strategies"],
        },
        "3": {
            name: "Stocks",
            lessons: ["Stock Market Basics", "Stock Valuation", "Trading Fundamentals"],
        },
        "4": {
            name: "Mutual Funds",
            lessons: ["Fund Types and Structure", "Fund Selection", "Portfolio Management"],
        },
        "5": {
            name: "Dividends",
            lessons: ["Dividend Basics", "Dividend Strategies", "Income Investing"],
        },
        "6": {
            name: "Strategy",
            lessons: ["Investment Approaches", "Market Timing", "Portfolio Rebalancing"],
        },
        "7": {
            name: "Savings",
            lessons: ["Emergency Funds", "Saving Strategies", "Goal-Based Saving"],
        },
        "8": {
            name: "Risk",
            lessons: ["Risk Types", "Risk Management", "Risk-Adjusted Returns"],
        },
        "9": {
            name: "Portfolio",
            lessons: ["Asset Allocation", "Diversification Strategies", "Portfolio Optimization"],
        },
    };

    const category = topics[categoryId as keyof typeof topics];
    if (!category) throw new Error("Invalid category");

    const lessonTitle = category.lessons[lessonIndex];
    if (!lessonTitle) throw new Error("Invalid lesson index");

    const questions = await generateQuestionsWithGemini(category.name, lessonTitle);

    return {
        id: `${categoryId}-${lessonIndex}`,
        title: lessonTitle,
        questions,
    };
}

function validateQuestions(questions: any[]): QuestionData[] {
    return questions.map((q) => {
        switch (q.type) {
            case "true-false":
                if (typeof q.question !== "string" || typeof q.correctAnswer !== "boolean") {
                    throw new Error("Invalid true-false question format");
                }
                break;
            case "multiple-choice":
                if (!Array.isArray(q.options) || q.options.length !== 4 || typeof q.correctAnswer !== "number") {
                    throw new Error("Invalid multiple-choice question format");
                }
                break;
            case "fill-blank":
                if (!Array.isArray(q.segments)) {
                    throw new Error("Invalid fill-blank question format");
                }
                break;
            default:
                throw new Error(`Unknown question type: ${q.type}`);
        }
        return q as QuestionData;
    });
}
