export type Rank = 'Starter' | 'Expert' | 'Master' | 'Veteran';

export const RANK_THRESHOLDS = {
    Starter: 0,
    Expert: 500,
    Master: 1000,
    Veteran: 2000
};

export interface UserRank {
    rank: Rank;
    progress: number; // Progress towards next rank (0-100)
    totalCoins: number;
    nextRankCoins: number;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    category: string;
    icon: string;
    coins: number; // Coins awarded for completing this achievement
}

export interface Friend {
    id: string;
    name: string;
    rank: Rank;
    achievementCount: number;
    totalCoins: number;
    avatarUrl?: string;
}