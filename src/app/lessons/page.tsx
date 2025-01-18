"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { lessons } from "../data/lessons";
import Lesson from "../components/lessons/Lesson";

export default function LessonPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const category = searchParams.get("category");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && (!category || !lessons[category])) {
            router.push("/");
        }
    }, [category, router, mounted]);

    const handleLessonComplete = () => {
        router.push("/");
    };

    if (!mounted || !category || !lessons[category]) {
        return <div className="min-h-screen bg-gray-50">error!!!!</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Lesson lesson={lessons[category]} onComplete={handleLessonComplete} />
        </div>
    );
}
