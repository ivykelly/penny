'use client';

import { useRouter } from 'next/navigation';

export default function InvestmentSimulation() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          ← Back
        </button>
        
        <h1 className="text-3xl font-bold mb-8">Investment Simulator</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-gray-600 mb-4">
            Interactive investment simulation coming soon...
          </p>
        </div>
      </div>
    </div>
  );
} 