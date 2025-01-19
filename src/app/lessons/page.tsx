"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lesson from "../components/lessons/Lesson";
import { useProgress } from "../contexts/ProgressContext";
import { LessonData } from "../types/lesson";
import { generateLesson } from "../services/questionGenerator";
import { categories } from "../data/categories";

export default function LessonPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const categoryId = searchParams.get("category");
    const lessonIndex = parseInt(searchParams.get("lesson") || "0");
    const { completeLesson } = useProgress();
    const categoryTitle = categoryId ? categories[categoryId]?.title : "";

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        async function loadLesson() {
            if (!categoryId) return;

            try {
                setLoading(true);
                setError(null);
                const lesson = await generateLesson(categoryId, lessonIndex);
                setCurrentLesson(lesson);
            } catch (error) {
                console.error("Failed to generate lesson:", error);
                setError((error as Error).message || "Failed to generate lesson");
            } finally {
                setLoading(false);
            }
        }

        if (mounted) {
            loadLesson();
        }
    }, [mounted, categoryId, lessonIndex, router]);

    const handleLessonComplete = () => {
        if (categoryId) {
            completeLesson(categoryId, lessonIndex);
            const nextLesson = lessonIndex + 1;
            if (nextLesson < 3) {
                // Now hardcoded to 3 lessons per category
                router.push(`/lessons?category=${categoryId}&lesson=${nextLesson}`);
            } else {
                router.push("/");
            }
        }
    };

    if (!mounted || loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-2xl">🤔</div>
                    <p className="text-lg font-medium text-gray-600">Generating your lesson...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-2xl">😕</div>
                    <p className="mb-4 text-lg font-medium text-red-600">{error}</p>
                    <button onClick={() => router.push("/")} className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    if (!currentLesson) {
        return <p>Failed to load lesson</p>;
    }

    return <Lesson lesson={currentLesson} onComplete={handleLessonComplete} categoryTitle={categoryTitle} />;
}
