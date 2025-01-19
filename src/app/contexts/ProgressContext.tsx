"use client";

import { createContext, useContext, useState } from "react";
import { UserProgress } from "../types/lesson";
import { categories } from "../data/categories";

// Define the shape of the context
interface ProgressContextType {
    progress: UserProgress;
    completeLesson: (categoryId: string, lessonIndex: number) => void;
    getCurrentLesson: (categoryId: string) => number;
    getCategoryProgress: (categoryId: string) => number;
    isCategoryCompleted: (categoryId: string) => boolean;
}

// Create the context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Define the ProgressProvider component
export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState<UserProgress>({});

    // Define the completeLesson function to complete a lesson
    const completeLesson = (categoryId: string, lessonIndex: number) => {
        const categoryProgress = progress[categoryId] || { completedLessons: [], currentLessonIndex: 0 };

        // Only add the lesson if it hasn't been completed yet
        if (!categoryProgress.completedLessons.includes(lessonIndex)) {
            const newProgress = {
                ...progress,
                [categoryId]: {
                    completedLessons: [...categoryProgress.completedLessons, lessonIndex],
                    currentLessonIndex: lessonIndex + 1,
                },
            };
            setProgress(newProgress);
        }
    };

    // Define the getCurrentLesson function to get the current lesson
    const getCurrentLesson = (categoryId: string) => {
        return progress[categoryId]?.currentLessonIndex || 0;
    };

    // Define the getTotalLessonsInCategory function to get the total lessons in a category
    const getTotalLessonsInCategory = (categoryId: string) => {
        return categories[categoryId]?.lessons.length || 0;
    };

    // Define the getCategoryProgress function to get the progress of a category
    const getCategoryProgress = (categoryId: string) => {
        const categoryProgress = progress[categoryId];
        if (!categoryProgress) return 0;
        return (categoryProgress.completedLessons.length / getTotalLessonsInCategory(categoryId)) * 100;
    };

    // Define the isCategoryCompleted function to check if a category is completed
    const isCategoryCompleted = (categoryId: string) => {
        const categoryProgress = progress[categoryId];
        if (!categoryProgress) return false;

        const totalLessons = getTotalLessonsInCategory(categoryId);
        return categoryProgress.completedLessons.length === totalLessons;
    };

    // Return the ProgressProvider component
    return <ProgressContext.Provider value={{ progress, completeLesson, getCurrentLesson, getCategoryProgress, isCategoryCompleted }}>{children}</ProgressContext.Provider>;
}

// Define the useProgress hook to use the progress context
export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
};
