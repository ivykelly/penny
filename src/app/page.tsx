"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "./data/categories";
import { useProgress } from "./contexts/ProgressContext";

const learningPaths = [
    { id: "1", title: "Basics", icon: "/icons/basics.png" },
    { id: "2", title: "Bonds", icon: "/icons/bonds.png" },
    { id: "3", title: "Stocks", icon: "/icons/stocks.png" },
    { id: "4", title: "Mutual Funds", icon: "/icons/funds.png" },
    { id: "5", title: "Dividends", icon: "/icons/dividends.png" },
    { id: "6", title: "Strategy", icon: "/icons/strategy.png" },
    { id: "7", title: "Savings", icon: "/icons/savings.png" },
    { id: "8", title: "Risk", icon: "/icons/risk.png" },
    { id: "9", title: "Portfolio", icon: "/icons/portfolio.png" },
] as const;

export default function Home() {
    const router = useRouter();
    const { getCategoryProgress, getCurrentLesson, isCategoryCompleted } = useProgress();

    const handlePathClick = (pathId: string) => {
        if (!categories[pathId]) {
            console.log("Lessons coming soon!");
            return;
        }

        if (isCategoryCompleted(pathId)) {
            console.log("Category completed!");
            return;
        }

        const currentLesson = getCurrentLesson(pathId);
        router.push(`/lessons?category=${pathId}&lesson=${currentLesson}`);
    };

    const getCategoryStyle = (pathId: string) => {
        if (!categories[pathId]) return "cursor-not-allowed bg-gray-100";
        if (isCategoryCompleted(pathId)) return "cursor-not-allowed bg-green-100 opacity-75";
        return "bg-red-100";
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-10">
                {/* First Row - Single Item */}
                <div className="flex w-full max-w-2xl justify-center">
                    <div className="flex w-[calc(50%-32px)] flex-col space-y-2">
                        <span className="text-center text-sm font-bold text-pink-900">
                            {learningPaths[0].title}
                            {isCategoryCompleted(learningPaths[0].id) && <span className="ml-2 text-green-600">(Completed!)</span>}
                        </span>
                        <button onClick={() => handlePathClick(learningPaths[0].id)} className={`flex aspect-square w-full flex-col items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${getCategoryStyle(learningPaths[0].id)}`}>
                            <Image src={learningPaths[0].icon} alt={learningPaths[0].title} width={48} height={48} className="h-12 w-12" />
                        </button>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                            <div className={`h-full transition-all duration-300 ${isCategoryCompleted(learningPaths[0].id) ? "bg-green-500" : "bg-green-500"}`} style={{ width: `${getCategoryProgress(learningPaths[0].id)}%` }} />
                        </div>
                    </div>
                </div>

                {/* Remaining Rows - Two Items per Row */}
                <div className="grid w-full max-w-2xl grid-cols-2 gap-x-16 gap-y-10">
                    {learningPaths.slice(1).map((path) => (
                        <div key={path.id} className="flex flex-col space-y-2">
                            <span className="text-center text-sm font-bold text-pink-900">
                                {path.title}
                                {isCategoryCompleted(path.id) && <span className="ml-2 text-green-600">(Completed!)</span>}
                            </span>
                            <button onClick={() => handlePathClick(path.id)} className={`flex aspect-square w-full flex-col items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${getCategoryStyle(path.id)}`}>
                                <Image src={path.icon} alt={path.title} width={48} height={48} className="h-12 w-12" />
                            </button>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                <div className={`h-full transition-all duration-300 ${isCategoryCompleted(path.id) ? "bg-green-500" : "bg-green-500"}`} style={{ width: `${getCategoryProgress(path.id)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
