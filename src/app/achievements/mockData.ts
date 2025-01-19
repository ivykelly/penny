import { Achievement, Friend } from './types';

export const achievements: Achievement[] = [
    {
        id: 'first-step',
        name: 'First Step',
        description: 'Make your first investment',
        isCompleted: false,
        category: 'Milestones',
        icon: '/icons/achievements/first.svg',
        coins: 100
    },
    {
        id: 'Penny-saved',
        name: 'Penny Saved',
        description: 'Save $100',
        isCompleted: false,
        category: 'Milestones',
        icon: '/icons/achievements/penny.svg',
        coins: 150
    },
    {
        id: 'index-fund-master',
        name: 'Index Fund Master',
        description: 'Invest in an index fund',
        isCompleted: false,
        category: 'Investment Types',
        icon: '/icons/achievements/index.svg',
        coins: 300
    },
    {
        id: 'portfolio-master',
        name: 'Portfolio Master',
        description: 'Invest in 3 different asset classes',
        isCompleted: false,
        category: 'Portfolio Management',
        icon: '/icons/achievements/diversify.svg',
        coins: 400
    },
    {
        id: 'Market-player',
        name: 'Market Player',
        description: 'Execute 10 trades',
        isCompleted: false,
        category: 'Milestones',
        icon: '/icons/achievements/first.svg',
        coins: 250
    },
    {
        id: 'quiz-wiz',
        name: 'Quiz Wiz',
        description: 'Score 100% on all lessons',
        isCompleted: false,
        category: 'Learning',
        icon: '/icons/achievements/quiz.svg',
        coins: 500
    }
];

export const mockFriends: Friend[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        rank: 'Expert',
        achievementCount: 15,
        totalCoins: 750,
        avatarUrl: '/characters/Young Woman.png'
    },
    {
        id: '2',
        name: 'Mike Chen',
        rank: 'Master',
        achievementCount: 25,
        totalCoins: 1500,
        avatarUrl: '/characters/Ginger Man.png'
    },
    {
        id: '3',
        name: 'Emma Davis',
        rank: 'Starter',
        achievementCount: 5,
        totalCoins: 300,
        avatarUrl: '/characters/Grandma.png'
    }
]; 