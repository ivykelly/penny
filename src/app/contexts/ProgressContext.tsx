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
        const newProgress = {
            ...progress,
            [categoryId]: { // Add the category to the progress
                completedLessons: [...new Set([...categoryProgress.completedLessons, lessonIndex])], // Add the lesson to the completed lessons
                currentLessonIndex: lessonIndex + 1, // Update the current lesson index
            },
        };
        setProgress(newProgress); // Update the progress
    };

    // Define the getCurrentLesson function to get the current lesson
    const getCurrentLesson = (categoryId: string) => {
        return progress[categoryId]?.currentLessonIndex || 0; // Return the current lesson index
    };

    // Define the getTotalLessonsInCategory function to get the total lessons in a category
    const getTotalLessonsInCategory = (categoryId: string) => {
        return categories[categoryId]?.lessons.length || 0; // Return the total lessons in the category
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
