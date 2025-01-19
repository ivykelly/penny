"use client";

import { useProgress } from "../contexts/ProgressContext";
import { categories } from "../data/categories";

interface CategoryProgressProps {
    categoryId: string;
}

export default function CategoryProgress({ categoryId }: CategoryProgressProps) {
    const { progress } = useProgress();
    const categoryProgress = progress[categoryId];
    const completedLessons = categoryProgress?.completedLessons?.length || 0;
    const totalLessons = categories[categoryId]?.lessons.length || 3;

    // Helper function to check if a lesson is completed
    const isLessonCompleted = (index: number) => {
        if (!categoryProgress?.completedLessons) return false;
        return categoryProgress.completedLessons.includes(index);
    };

    return (
        <div className="mt-2 w-full">
            <div className="flex gap-1">
                {[...Array(totalLessons)].map((_, index) => (
                    <div key={index} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${isLessonCompleted(index) ? "bg-[#58CC02]" : "bg-gray-200"}`} />
                ))}
            </div>
            <p className="mt-1.5 text-center text-xs font-medium text-pink-900">
                {completedLessons}/{totalLessons} complete
            </p>
        </div>
    );
}
