import { Achievement, Friend } from './types';

export const achievements: Achievement[] = [
    {
        id: 'react-to-crash',
        name: 'React to Crash',
        description: 'Successfully navigate a market crash scenario',
        isCompleted: false,
        category: 'Market Skills',
        icon: '/icons/achievements/crash.svg'
    },
    {
        id: 'sustainable-investing',
        name: 'Sustainable Investing',
        description: 'Make your first sustainable investment',
        isCompleted: false,
        category: 'Investment Types',
        icon: '/icons/achievements/sustainable.svg'
    },
    {
        id: 'index-fund-master',
        name: 'Index Fund Master',
        description: 'Invest in a diversified index fund',
        isCompleted: false,
        category: 'Investment Types',
        icon: '/icons/achievements/index.svg'
    },
    {
        id: 'diversify',
        name: 'Diversification Pro',
        description: 'Create a well-diversified portfolio',
        isCompleted: false,
        category: 'Portfolio Management',
        icon: '/icons/achievements/diversify.svg'
    },
    {
        id: 'first-investment',
        name: 'First Steps',
        description: 'Make your first investment',
        isCompleted: false,
        category: 'Milestones',
        icon: '/icons/achievements/first.svg'
    },
    {
        id: 'quiz-wiz',
        name: 'Quiz Wiz',
        description: 'Score 100% on all lessons',
        isCompleted: false,
        category: 'Learning',
        icon: '/icons/achievements/quiz.svg'
    }
];

export const mockFriends: Friend[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        rank: 'Expert',
        achievementCount: 15,
        avatarUrl: '/avatars/sarah.jpg'
    },
    {
        id: '2',
        name: 'Mike Chen',
        rank: 'Master',
        achievementCount: 25,
        avatarUrl: '/avatars/mike.jpg'
    },
    {
        id: '3',
        name: 'Emma Davis',
        rank: 'Starter',
        achievementCount: 5,
        avatarUrl: '/avatars/emma.jpg'
    }
]; 