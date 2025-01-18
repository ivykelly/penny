'use client';

import { useState } from 'react';
import { achievements, mockFriends } from './mockData';
import { Achievement, Friend, Rank } from './types';

export default function AchievementsPage() {
    const [userRank] = useState<Rank>('Starter');
    const [completedAchievements, setCompletedAchievements] = useState<string[]>([]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Leaderboard Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* User's Rank */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Your Rank: {userRank}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">45/100 points to next rank</div>
                    </div>

                    {/* Friends List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Friends & Family</h3>
                        <div className="space-y-4">
                            {mockFriends.map((friend: Friend) => (
                                <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-300">
                                            {friend.avatarUrl && (
                                                <img
                                                    src={friend.avatarUrl}
                                                    alt={friend.name}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{friend.name}</p>
                                            <p className="text-sm text-gray-600">{friend.rank}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {friend.achievementCount} achievements
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section>
                <h2 className="text-2xl font-bold mb-6">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((achievement: Achievement) => (
                        <div
                            key={achievement.id}
                            className={`bg-white rounded-lg shadow-lg p-6 ${
                                achievement.isCompleted ? 'border-2 border-yellow-400' : ''
                            }`}
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className={`w-12 h-12 ${
                                    achievement.isCompleted ? 'text-yellow-400' : 'text-gray-400'
                                }`}>
                                    {/* Replace with actual icon component */}
                                    <div className="w-full h-full rounded-full bg-current"></div>
                                </div>
                                <h3 className="text-lg font-semibold">{achievement.name}</h3>
                            </div>
                            <p className="text-gray-600">{achievement.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
} 