export type Rank = 'Starter' | 'Expert' | 'Master' | 'Veteran';

export interface UserRank {
    rank: Rank;
    progress: number; // Progress towards next rank (0-100)
    requiredPoints: number;
    currentPoints: number;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    category: string;
    icon: string; // Path to icon
}

export interface Friend {
    id: string;
    name: string;
    rank: Rank;
    achievementCount: number;
    avatarUrl?: string;
} 