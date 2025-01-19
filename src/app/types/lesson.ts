export type QuestionType = "true-false" | "multiple-choice" | "fill-blank";

// Define the BaseQuestion interface
export interface BaseQuestion {
    type: QuestionType;
    question: string;
}

// Define the TrueFalseQuestionData interface
export interface TrueFalseQuestionData extends BaseQuestion {
    type: "true-false";
    correctAnswer: boolean;
}

// Define the MultipleChoiceQuestionData interface
export interface MultipleChoiceQuestionData extends BaseQuestion {
    type: "multiple-choice";
    options: string[];
    correctAnswer: number;
}

// Define the FillBlankQuestionData interface
export interface FillBlankQuestionData extends BaseQuestion {
    type: "fill-blank";
    segments: Array<{
        type: "text" | "blank";
        content: string;
        answer?: string;
        placeholder?: string;
    }>;
}

// Define the QuestionData interface
export type QuestionData = TrueFalseQuestionData | MultipleChoiceQuestionData | FillBlankQuestionData;

// Define the LessonData interface
export interface LessonData {
    id: string;
    title: string;
    questions: QuestionData[];
}
    
// Define the CategoryData interface
export interface CategoryData {
    id: string;
    title: string;
    lessons: LessonData[];
    currentLessonIndex: number; // Track which lesson user is on
    progress: number; // 0-100
}

// Define the UserProgress interface
export interface UserProgress {
    [categoryId: string]: {
        completedLessons: number[];
        currentLessonIndex: number;
    };
}
