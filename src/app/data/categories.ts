import { CategoryData } from "../types/lesson";

// Define the categories data
export const categories: { [key: string]: CategoryData } = {
    "1": { // Define the first category
        id: "basics", // Define the id of the category
        title: "Basic Concepts", // Define the title of the category
        lessons: [
            { id: "basics-1", title: "Investment Fundamentals", questions: [] },
            { id: "basics-2", title: "Risk and Return", questions: [] },
            { id: "basics-3", title: "Market Analysis", questions: [] },
        ],
        currentLessonIndex: 0, // Define the current lesson index
        progress: 0, // Define the progress of the category
    },
    "2": {
        id: "bonds",
        title: "Bonds",
        lessons: [
            { id: "bonds-1", title: "Bond Fundamentals", questions: [] },
            { id: "bonds-2", title: "Types of Bonds", questions: [] },
            { id: "bonds-3", title: "Bond Trading Strategies", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "3": {
        id: "stocks",
        title: "Stocks",
        lessons: [
            { id: "stocks-1", title: "Stock Market Basics", questions: [] },
            { id: "stocks-2", title: "Stock Valuation", questions: [] },
            { id: "stocks-3", title: "Trading Fundamentals", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "4": {
        id: "funds",
        title: "Mutual Funds",
        lessons: [
            { id: "funds-1", title: "Fund Types and Structure", questions: [] },
            { id: "funds-2", title: "Fund Selection", questions: [] },
            { id: "funds-3", title: "Portfolio Management", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "5": {
        id: "dividends",
        title: "Dividends",
        lessons: [
            { id: "dividends-1", title: "Dividend Basics", questions: [] },
            { id: "dividends-2", title: "Dividend Strategies", questions: [] },
            { id: "dividends-3", title: "Income Investing", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "6": {
        id: "strategy",
        title: "Strategy",
        lessons: [
            { id: "strategy-1", title: "Investment Approaches", questions: [] },
            { id: "strategy-2", title: "Market Timing", questions: [] },
            { id: "strategy-3", title: "Portfolio Rebalancing", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "7": {
        id: "savings",
        title: "Savings",
        lessons: [
            { id: "savings-1", title: "Emergency Funds", questions: [] },
            { id: "savings-2", title: "Saving Strategies", questions: [] },
            { id: "savings-3", title: "Goal-Based Saving", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "8": {
        id: "risk",
        title: "Risk",
        lessons: [
            { id: "risk-1", title: "Risk Types", questions: [] },
            { id: "risk-2", title: "Risk Management", questions: [] },
            { id: "risk-3", title: "Risk-Adjusted Returns", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
    "9": {
        id: "portfolio",
        title: "Portfolio",
        lessons: [
            { id: "portfolio-1", title: "Asset Allocation", questions: [] },
            { id: "portfolio-2", title: "Diversification Strategies", questions: [] },
            { id: "portfolio-3", title: "Portfolio Optimization", questions: [] },
        ],
        currentLessonIndex: 0,
        progress: 0,
    },
};
