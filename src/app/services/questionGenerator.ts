import { QuestionData, LessonData, TrueFalseQuestionData, MultipleChoiceQuestionData, FillBlankQuestionData } from "../types/lesson";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { categories } from "../data/categories";

const API_KEY = process.env.GEMINI_API_KEY;

// Define the generateQuestionsWithGemini function
async function generateQuestionsWithGemini(topic: string, lessonTitle: string): Promise<QuestionData[]> {
    if (!API_KEY) {
        throw Error("api key env var not defined");
    }

    // Define the GoogleGenerativeAI instance
    const genAI = new GoogleGenerativeAI(API_KEY); // Create a new GoogleGenerativeAI instance
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Get the Gemini 1.5 Flash model
    const MAX_ATTEMPTS = 5; // Define the maximum attempts 
    let attempt = 1; // Define the attempt variable

    // Define the prompt
    const prompt = `
            Generate 7 educational questions about ${topic} focusing on ${lessonTitle}.
            Make questions educational and progressively more challenging. It should start off very very easy like a kid should be able to answer the first category and then get progressively harder where the last category is very complex!
            Order of difficulty (easiest to harder):, Basics, Bonds, Stocks, Mutual Funds, Dividends, Savings, Risk, Portfolio
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
            - Create a single flowing sentence with 2-3 blanks integrated naturally
            - Clear context within the sentence for the correct answer
            - The placeholder should be a short one word hint; it should not contain the answer
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

    // Define the while loop
    while (attempt <= MAX_ATTEMPTS) {
        try {
            const result = await model.generateContent(prompt); // Generate content from the model
            const response = result.response; // Get the response
            let responseText = response.text(); // Get the text from the response

            // Try to extract JSON if response is wrapped in backticks
            if (responseText.includes("```json")) {
                responseText = responseText.split("```json")[1].split("```")[0];
            } else if (responseText.startsWith("```") && responseText.endsWith("```")) {
                responseText = responseText.slice(3, -3);
            }

            // Clean up any remaining whitespace
            responseText = responseText.trim();

            const questions = JSON.parse(responseText); // Parse the response text as JSON

            if (!Array.isArray(questions)) {
                throw new Error("Gemini response is not an array");
            }

            if (questions.length !== 7) {
                throw new Error(`Expected 7 questions but got ${questions.length}`); // Throw an error if the number of questions is not 7
            }

            return validateQuestions(questions);
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);
            if (attempt === MAX_ATTEMPTS) {
                throw new Error("Failed to generate questions after multiple attempts: " + (error as Error).message);
            }
            attempt++;
            // Add a small delay between retries
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    // This should never be reached due to the throw in the last attempt
    throw new Error("Failed to generate questions");
}

// Define the generateLesson function
export async function generateLesson(categoryId: string, lessonIndex: number): Promise<LessonData> {
    const category = categories[categoryId];
    if (!category) throw new Error("Invalid category"); // Throw an error if the category is not found

    const lessonTitle = category.lessons[lessonIndex]?.title; // Get the lesson title
    if (!lessonTitle) throw new Error("Invalid lesson index"); // Throw an error if the lesson title is not found

    const questions = await generateQuestionsWithGemini(category.title, lessonTitle);

    return {
        id: `${category.id}-${lessonIndex + 1}`,
        title: lessonTitle,
        questions,
    };
}

interface UnknownRecord {
    [key: string]: unknown;
}

// Define the isTrueFalseQuestion function
function isTrueFalseQuestion(q: unknown): q is TrueFalseQuestionData {
    const record = q as UnknownRecord;
    return typeof q === "object" && q !== null && record.type === "true-false" && typeof record.question === "string" && typeof record.correctAnswer === "boolean";
}

// Define the isMultipleChoiceQuestion function
function isMultipleChoiceQuestion(q: unknown): q is MultipleChoiceQuestionData {
    const record = q as UnknownRecord;
    return typeof q === "object" && q !== null && record.type === "multiple-choice" && typeof record.question === "string" && Array.isArray(record.options) && record.options.length === 4 && record.options.every((opt) => typeof opt === "string") && typeof record.correctAnswer === "number" && Number.isInteger(record.correctAnswer) && record.correctAnswer >= 0 && record.correctAnswer < 4;
}

function isFillBlankQuestion(q: unknown): q is FillBlankQuestionData {
    const record = q as UnknownRecord;
    return (
        typeof q === "object" &&
        q !== null &&
        record.type === "fill-blank" &&
        typeof record.question === "string" &&
        Array.isArray(record.segments) &&
        record.segments.every((segment: unknown) => {
            if (typeof segment !== "object" || segment === null) return false;
            const seg = segment as UnknownRecord;
            return (seg.type === "text" || seg.type === "blank") && typeof seg.content === "string" && (seg.answer === undefined || typeof seg.answer === "string") && (seg.placeholder === undefined || typeof seg.placeholder === "string");
        })
    );
}

// Define the validateQuestions function
function validateQuestions(questions: unknown[]): QuestionData[] {
    return questions.map((q) => { 
        if (!q || typeof q !== "object") {
            throw new Error("Invalid question format");
        }

        if (isTrueFalseQuestion(q)) {
            return q;
        } else if (isMultipleChoiceQuestion(q)) {
            return q;
        } else if (isFillBlankQuestion(q)) {
            return q;
        }

        throw new Error(`Invalid question format or unknown question type`);
    });
}
