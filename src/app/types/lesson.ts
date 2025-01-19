export type QuestionType = "true-false" | "multiple-choice" | "fill-blank";

export interface BaseQuestion {
    type: QuestionType;
    question: string;
}

export interface TrueFalseQuestionData extends BaseQuestion {
    type: "true-false";
    correctAnswer: boolean;
}

export interface MultipleChoiceQuestionData extends BaseQuestion {
    type: "multiple-choice";
    options: string[];
    correctAnswer: number;
}

export interface FillBlankQuestionData extends BaseQuestion {
    type: "fill-blank";
    segments: Array<{
        type: "text" | "blank";
        content: string;
        answer?: string;
        placeholder?: string;
    }>;
}

export type QuestionData = TrueFalseQuestionData | MultipleChoiceQuestionData | FillBlankQuestionData;

export interface LessonData {
    id: string;
    title: string;
    questions: QuestionData[];
}

export interface CategoryData {
    id: string;
    title: string;
    lessons: LessonData[];
    currentLessonIndex: number; // Track which lesson user is on
    progress: number; // 0-100
}

export interface UserProgress {
    [categoryId: string]: {
        completedLessons: number[];
        currentLessonIndex: number;
    };
}
