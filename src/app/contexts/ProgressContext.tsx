"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { UserProgress } from "../types/lesson";
import { categories } from "../data/categories";

interface ProgressContextType {
    progress: UserProgress;
    completeLesson: (categoryId: string, lessonIndex: number) => void;
    getCurrentLesson: (categoryId: string) => number;
    getCategoryProgress: (categoryId: string) => number;
    isCategoryCompleted: (categoryId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [progress, setProgress] = useState<UserProgress>({});

    const completeLesson = (categoryId: string, lessonIndex: number) => {
        const categoryProgress = progress[categoryId] || { completedLessons: [], currentLessonIndex: 0 };
        const newProgress = {
            ...progress,
            [categoryId]: {
                completedLessons: [...new Set([...categoryProgress.completedLessons, lessonIndex])],
                currentLessonIndex: lessonIndex + 1,
            },
        };
        setProgress(newProgress);
    };

    const getCurrentLesson = (categoryId: string) => {
        return progress[categoryId]?.currentLessonIndex || 0;
    };

    const getTotalLessonsInCategory = (categoryId: string) => {
        return categories[categoryId]?.lessons.length || 0;
    };

    const getCategoryProgress = (categoryId: string) => {
        const categoryProgress = progress[categoryId];
        if (!categoryProgress) return 0;
        return (categoryProgress.completedLessons.length / getTotalLessonsInCategory(categoryId)) * 100;
    };

    const isCategoryCompleted = (categoryId: string) => {
        const categoryProgress = progress[categoryId];
        if (!categoryProgress) return false;

        const totalLessons = getTotalLessonsInCategory(categoryId);
        return categoryProgress.completedLessons.length === totalLessons;
    };

    return <ProgressContext.Provider value={{ progress, completeLesson, getCurrentLesson, getCategoryProgress, isCategoryCompleted }}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
};
