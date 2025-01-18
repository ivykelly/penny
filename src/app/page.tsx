'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const learningPaths = [
  { id: 1, title: 'Basics', icon: '/icons/basics.png', progress: 100 },
  { id: 2, title: 'Stock Market', icon: '/icons/stocks.png', progress: 50 },
  { id: 3, title: 'Retirement', icon: '/icons/retirement.png', progress: 0 },
  { id: 4, title: 'Crypto', icon: '/icons/crypto.png', progress: 0 },
  { id: 5, title: 'Real Estate', icon: '/icons/real-estate.png', progress: 0 },
  { id: 6, title: 'Budgeting', icon: '/icons/budgeting.png', progress: 0 },
  { id: 7, title: 'Taxes', icon: '/icons/taxes.png', progress: 0 },
  { id: 8, title: 'DebtManagement', icon: '/icons/debt.png', progress: 0 },
  { id: 9, title: 'Insurance', icon: '/icons/insurance.png', progress: 0 },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-red-50 p-8">
      
      {/* Learning Paths Grid */}
      <div className="flex flex-col items-center gap-y-10 max-w-3xl mx-auto">
        {/* First Row - Single Item */}
        <div className="w-full max-w-2xl flex justify-center">
          <div className="flex flex-col space-y-2 w-[calc(50%-32px)]">
            <span className="text-sm font-bold text-pink-900 text-center">
              {learningPaths[0].title}
            </span>
            <button
              onClick={() => router.push(`/learn/${learningPaths[0].id}`)}
              className="aspect-square rounded-full bg-red-100 shadow-lg hover:shadow-xl 
                       transition-all duration-300 flex flex-col items-center 
                       justify-center p-4 hover:scale-105 w-full"
            >
              <Image 
                src={learningPaths[0].icon}
                alt={learningPaths[0].title}
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </button>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-300"
                style={{ width: `${learningPaths[0].progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Remaining Rows - Two Items per Row */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-10 w-full max-w-2xl">
          {learningPaths.slice(1).map((path) => (
            <div key={path.id} className="flex flex-col space-y-2">
              <span className="text-sm font-bold text-pink-900 text-center">
                {path.title}
              </span>
              <button
                onClick={() => router.push(`/learn/${path.id}`)}
                className="aspect-square rounded-full bg-red-100 shadow-lg hover:shadow-xl 
                         transition-all duration-300 flex flex-col items-center 
                         justify-center p-4 hover:scale-105 w-full"
              >
                <Image 
                  src={path.icon}
                  alt={path.title}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </button>
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300"
                  style={{ width: `${path.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
