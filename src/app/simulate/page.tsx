"use client";

import { useRouter } from "next/navigation";

export default function InvestmentSimulation() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-red-50 p-8">
            <div className="mx-auto max-w-4xl">
                <button onClick={() => router.back()} className="mb-6 text-gray-600 hover:text-gray-800">
                    ← Back
                </button>

                <h1 className="mb-8 text-3xl font-bold">Investment Simulator</h1>

                <div className="rounded-lg bg-white p-6 shadow-lg">
                    <p className="mb-4 text-gray-600">Interactive investment simulation coming soon...</p>
                </div>
            </div>
        </div>
    );
}
