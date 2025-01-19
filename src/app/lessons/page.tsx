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
    const [attempt, setAttempt] = useState(1);
    const categoryId = searchParams.get("category");
    const lessonIndex = parseInt(searchParams.get("lesson") || "0");
    const { completeLesson } = useProgress();
    const categoryTitle = categoryId ? categories[categoryId]?.title : "";

    // Define the useEffect hook to set the mounted state to true
    useEffect(() => {
        setMounted(true);
    }, []);

    // Define the useEffect hook to load the lesson
    useEffect(() => {
        async function loadLesson() {
            if (!categoryId) return; // If there is no category id, return from the function

            try {
                setLoading(true); // Set the loading state to true
                setError(null); // Set the error state to null
                setAttempt(1); // Set the attempt state to 1
                const lesson = await generateLesson(categoryId, lessonIndex).catch(async (error) => {
                    // If the error message indicates it was a retry attempt, increment our counter
                    if (error.message.includes("Attempt")) {
                        setAttempt((prev) => Math.min(prev + 1, 5));
                    }
                    throw error;
                });
                setCurrentLesson(lesson); // Set the current lesson
                // Scroll to top when lesson loads
                window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
            } catch (error) {
                console.error("Failed to generate lesson:", error);
                setError((error as Error).message || "Failed to generate lesson"); // Set the error state to the error message
            } finally {
                setLoading(false); // Set the loading state to false
            }
        }

        // If the mounted state is true, load the lesson
        if (mounted) {
            loadLesson();
        }
    }, [mounted, categoryId, lessonIndex, router]);

    // Define the handleLessonComplete function
    const handleLessonComplete = () => {
        if (categoryId) {
            completeLesson(categoryId, lessonIndex); // Complete the lesson
            const nextLesson = lessonIndex + 1; // Set the next lesson to the lesson index plus 1
            if (nextLesson < 3) {
                // Now hardcoded to 3 lessons per category
                router.push(`/lessons?category=${categoryId}&lesson=${nextLesson}`);
            } else {
                router.push("/");
            }
        }
    };

    // If the mounted state is false or the loading state is true, return the loading component
    if (!mounted || loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="mb-4 text-4xl">🤔</div>
                    <div className="flex flex-col items-center gap-3">
                        <p className="text-xl font-medium text-gray-600">Generating your lesson...</p>
                        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-gray-200">
                            <div className="h-full animate-[loading_1s_ease-in-out_infinite] bg-[#58CC02]" />
                        </div>
                        {attempt > 1 && <p className="mt-1 text-sm text-gray-500">Attempt {attempt} of 5</p>}
                    </div>
                </div>
            </div>
        );
    }

    // If the error state is not null, return the error component
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

    // If the current lesson is not null, return the lesson component
    if (!currentLesson) {
        return <p>Failed to load lesson</p>;
    }

    return <Lesson lesson={currentLesson} onComplete={handleLessonComplete} categoryTitle={categoryTitle} />;
}
