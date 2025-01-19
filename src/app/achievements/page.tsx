'use client';

import { useState, useMemo } from 'react';
import { achievements, mockFriends } from './mockData';
import { Achievement, Friend, Rank, RANK_THRESHOLDS } from './types';
import Avatar from './components/Avatar';

const ACHIEVEMENTS_PER_PAGE = 6;
const USER_AVATAR = '/characters/Purple Man.png';
const TROPHY_COMPLETED = '/icons/achievements/trophy.png';
const TROPHY_UNCOMPLETED = '/icons/achievements/trophy_grey.png';

export default function AchievementsPage() {
    const [completedAchievements, setCompletedAchievements] = useState<string[]>([]);
    const [visibleAchievements, setVisibleAchievements] = useState(ACHIEVEMENTS_PER_PAGE);

    const showMore = () => {
        setVisibleAchievements(prev => Math.min(prev + ACHIEVEMENTS_PER_PAGE, achievements.length));
    };

    // Calculate total coins and rank
    const { totalCoins, currentRank, progress, nextRankCoins } = useMemo(() => {
        const total = achievements
            .filter(a => completedAchievements.includes(a.id))
            .reduce((sum, a) => sum + a.coins, 0);

        // Determine current rank
        let currentRank: Rank = 'Starter';
        let nextRankCoins = RANK_THRESHOLDS.Expert;

        if (total >= RANK_THRESHOLDS.Veteran) {
            currentRank = 'Veteran';
            nextRankCoins = RANK_THRESHOLDS.Veteran;
        } else if (total >= RANK_THRESHOLDS.Master) {
            currentRank = 'Master';
            nextRankCoins = RANK_THRESHOLDS.Veteran;
        } else if (total >= RANK_THRESHOLDS.Expert) {
            currentRank = 'Expert';
            nextRankCoins = RANK_THRESHOLDS.Master;
        }

        // Calculate progress to next rank
        const currentThreshold = RANK_THRESHOLDS[currentRank];
        const progress = currentRank === 'Veteran' 
            ? 100 
            : ((total - currentThreshold) / (nextRankCoins - currentThreshold)) * 100;

        return {
            totalCoins: total,
            currentRank,
            progress,
            nextRankCoins
        };
    }, [completedAchievements]);

    // Sort friends by total coins
    const sortedFriends = useMemo(() => {
        return [...mockFriends].sort((a, b) => b.totalCoins - a.totalCoins);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Leaderboard Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* User's Rank */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <Avatar name="You" size="lg" src={USER_AVATAR} />
                            <div>
                                <h3 className="text-xl font-semibold">Your Progress</h3>
                                <p className="text-gray-600">Rank: {currentRank}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>{totalCoins} pennies</span>
                            <span>{currentRank !== 'Veteran' ? `${nextRankCoins - totalCoins} pennies to next rank` : 'Max rank achieved!'}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                                style={{ width: `${Math.min(100, progress)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Friends List */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Friends & Family</h3>
                        <div className="space-y-4">
                            {sortedFriends.map((friend: Friend, index: number) => (
                                <div 
                                    key={friend.id} 
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-gray-500 font-medium w-6">#{index + 1}</span>
                                            <Avatar 
                                                src={friend.avatarUrl} 
                                                name={friend.name} 
                                                size="md"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-lg">{friend.name}</p>
                                            <div className="text-sm text-gray-600">
                                                <span className="inline-flex items-center">
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${
                                                        friend.rank === 'Veteran' ? 'bg-purple-500' :
                                                        friend.rank === 'Master' ? 'bg-yellow-500' :
                                                        friend.rank === 'Expert' ? 'bg-green-500' :
                                                        'bg-gray-500'
                                                    }`}></span>
                                                    {friend.rank}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-700">
                                        {friend.totalCoins} pennies
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
                    {achievements.slice(0, visibleAchievements).map((achievement: Achievement) => {
                        const isCompleted = completedAchievements.includes(achievement.id);
                        return (
                            <div
                                key={achievement.id}
                                className={`bg-white rounded-lg shadow-lg p-6 ${
                                    isCompleted ? 'border-2 border-yellow-400' : ''
                                }`}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 relative">
                                        <img
                                            src={isCompleted ? TROPHY_COMPLETED : TROPHY_UNCOMPLETED}
                                            alt={isCompleted ? "Completed trophy" : "Uncompleted trophy"}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{achievement.name}</h3>
                                        <p className="text-sm text-gray-500">{achievement.coins} pennies</p>
                                    </div>
                                </div>
                                <p className="text-gray-600">{achievement.description}</p>
                            </div>
                        );
                    })}
                </div>
                
                {/* Show More Button */}
                {visibleAchievements < achievements.length && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={showMore}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Show More Achievements
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
} 