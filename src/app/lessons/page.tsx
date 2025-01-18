"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lesson from "../components/lessons/Lesson";
import { useProgress } from "../contexts/ProgressContext";
import { categories } from "../data/categories";

export default function LessonPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const categoryId = searchParams.get("category");
    const lessonIndex = parseInt(searchParams.get("lesson") || "0");
    const { completeLesson } = useProgress();

    // Handle initial mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle invalid category/lesson
    useEffect(() => {
        if (!mounted) return;

        const isValidCategory = categoryId && categories[categoryId];
        const currentLesson = isValidCategory ? categories[categoryId].lessons[lessonIndex] : null;

        if (!isValidCategory || !currentLesson) {
            router.push("/");
        }
    }, [mounted, categoryId, lessonIndex, router]);

    const handleLessonComplete = () => {
        if (categoryId) {
            completeLesson(categoryId, lessonIndex);
            const nextLesson = lessonIndex + 1;
            if (nextLesson < categories[categoryId].lessons.length) {
                router.push(`/lessons?category=${categoryId}&lesson=${nextLesson}`);
            } else {
                router.push("/");
            }
        }
    };

    // Show loading or error state
    if (!mounted || !categoryId || !categories[categoryId]) {
        return <p>Loading...</p>;
    }

    const currentLesson = categories[categoryId].lessons[lessonIndex];
    if (!currentLesson) {
        return <p>Lesson not found</p>;
    }

    return <Lesson lesson={currentLesson} onComplete={handleLessonComplete} />;
}
