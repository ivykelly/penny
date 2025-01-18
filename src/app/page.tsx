"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { lessons } from "./data/lessons";

const learningPaths = [
    { id: "basics", title: "Basics", icon: "/icons/basics.png", progress: 100 },
    { id: "stocks", title: "Stock Market", icon: "/icons/stocks.png", progress: 50 },
    { id: "crypto", title: "Cryptocurrency", icon: "/icons/crypto.png", progress: 0 },
    { id: "retirement", title: "Retirement", icon: "/icons/retirement.png", progress: 0 },
    { id: "real-estate", title: "Real Estate", icon: "/icons/real-estate.png", progress: 0 },
    { id: "budgeting", title: "Budgeting", icon: "/icons/budgeting.png", progress: 0 },
    { id: "taxes", title: "Taxes", icon: "/icons/taxes.png", progress: 0 },
    { id: "debt", title: "Debt Management", icon: "/icons/debt.png", progress: 0 },
    { id: "insurance", title: "Insurance", icon: "/icons/insurance.png", progress: 0 },
];

export default function Home() {
    const router = useRouter();

    const handlePathClick = (pathId: string) => {
        if (lessons[pathId]) {
            router.push(`/lessons?category=${pathId}`);
        } else {
            // For paths that don't have lessons yet
            console.log("Lessons coming soon!");
        }
    };

    return (
        <div className="min-h-screen bg-red-50 p-8">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-10">
                {/* First Row - Single Item */}
                <div className="flex w-full max-w-2xl justify-center">
                    <div className="flex w-[calc(50%-32px)] flex-col space-y-2">
                        <span className="text-center text-sm font-bold text-pink-900">{learningPaths[0].title}</span>
                        <button onClick={() => handlePathClick(learningPaths[0].id)} className={`flex aspect-square w-full flex-col items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${lessons[learningPaths[0].id] ? "bg-red-100" : "cursor-not-allowed bg-gray-100"}`}>
                            <Image src={learningPaths[0].icon} alt={learningPaths[0].title} width={48} height={48} className="h-12 w-12" />
                        </button>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${learningPaths[0].progress}%` }} />
                        </div>
                    </div>
                </div>

                {/* Remaining Rows - Two Items per Row */}
                <div className="grid w-full max-w-2xl grid-cols-2 gap-x-16 gap-y-10">
                    {learningPaths.slice(1).map((path) => (
                        <div key={path.id} className="flex flex-col space-y-2">
                            <span className="text-center text-sm font-bold text-pink-900">{path.title}</span>
                            <button onClick={() => handlePathClick(path.id)} className={`flex aspect-square w-full flex-col items-center justify-center rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${lessons[path.id] ? "bg-red-100" : "cursor-not-allowed bg-gray-100"}`}>
                                <Image src={path.icon} alt={path.title} width={48} height={48} className="h-12 w-12" />
                            </button>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${path.progress}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
