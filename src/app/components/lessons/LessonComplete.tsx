"use client";

import { useRouter } from "next/navigation";
import { LessonData } from "@/app/types/lesson";
import Image from "next/image";

interface LessonCompleteProps {
    lesson: LessonData;
    categoryTitle: string;
    coinsEarned: number;
    onComplete: () => void;
}

export default function LessonComplete({ lesson, categoryTitle, coinsEarned, onComplete }: LessonCompleteProps) {
    const router = useRouter();

    const handleReturnHome = () => {
        onComplete();
        router.push("/");
    };

    const getCoinDisplay = () => {
        if (coinsEarned === 0) return null;

        const isPositive = coinsEarned > 0;
        const bgColor = isPositive ? "bg-[#e5f6d3]" : "bg-[#FFE8E8]";
        const textColor = isPositive ? "text-[#58CC02]" : "text-[#ff4b4b]";
        const label = isPositive ? "Coins earned" : "Coins lost";
        const prefix = isPositive ? "+" : "";

        return (
            <div className={`rounded-xl ${bgColor} p-4`}>
                <p className={`mb-2 text-sm font-medium ${textColor}`}>{label} this lesson</p>
                <div className="flex items-center justify-center gap-2">
                    <Image src="/pennyWithCoin.png" alt="" width={32} height={32} className="h-8 w-8" />
                    <span className={`text-2xl font-bold ${textColor}`}>
                        {prefix}
                        {coinsEarned}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-20">
            <div className="relative w-full max-w-lg space-y-8 rounded-2xl bg-white p-8 text-center shadow-lg">
                {/* Trophy Icon */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFE8E8] shadow-lg">
                        <span className="text-4xl">🏆</span>
                    </div>
                </div>

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-[#58CC02]">Lesson Complete!</h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Great job completing
                        <br />
                        <span className="mt-2 block font-semibold text-[#1CB0F6]">
                            {categoryTitle}: {lesson.title}
                        </span>
                    </p>
                </div>

                {getCoinDisplay()}

                <button onClick={handleReturnHome} className="mt-8 w-full rounded-xl bg-[#58CC02] py-3 text-lg font-bold text-white shadow-[0_4px_0_0_#4CAD01] transition-all hover:bg-[#4CAD01] hover:shadow-[0_2px_0_0_#3B8C01] active:translate-y-[2px] active:shadow-[0_2px_0_0_#3B8C01]">
                    Continue Learning
                </button>
            </div>
        </div>
    );
}
