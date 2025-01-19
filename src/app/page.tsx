import Image from "next/image";
import Link from "next/link";
import { categories } from "./data/categories";
import Footer from "./components/Footer";

// Define the learningPaths array
const learningPaths = [
    { id: "1", title: "Basics", icon: "/icons/basics.png" },
    { id: "2", title: "Bonds", icon: "/icons/bonds.png" },
    { id: "3", title: "Stocks", icon: "/icons/stocks.png" },
    { id: "4", title: "Mutual Funds", icon: "/icons/funds.png" },
    { id: "5", title: "Dividends", icon: "/icons/dividends.png" },
    { id: "6", title: "Strategy", icon: "/icons/strategy.png" },
    { id: "7", title: "Savings", icon: "/icons/savings.png" },
    { id: "8", title: "Risk", icon: "/icons/risk.png" },
    { id: "9", title: "Portfolio", icon: "/icons/portfolio.png" },
] as const;

// Define the Home component
export default function Home() {
    // Define the getCategoryStyle function
    const getCategoryStyle = (pathId: string) => {
        if (!categories[pathId]) return "cursor-not-allowed bg-gray-100";
        return "bg-red-100 hover:bg-red-200";
    };

    // Return the Home component
    return (
        <div className="mx-8 mb-40 mt-16 min-h-screen bg-background">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-y-10">
                {/* First Row - Single Item */}
                <div className="flex w-full max-w-2xl justify-center">
                    <div className="flex w-[calc(50%-32px)] flex-col space-y-2">
                        <span className="text-center text-sm font-bold text-pink-900">{learningPaths[0].title}</span>
                        <Link href={categories[learningPaths[0].id] ? `/lessons?category=${learningPaths[0].id}&lesson=0` : "#"} className={`flex aspect-square w-full flex-col items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${getCategoryStyle(learningPaths[0].id)}`}>
                            <Image src={learningPaths[0].icon} alt={learningPaths[0].title} width={96} height={96} className="h-24 w-24" />
                        </Link>
                    </div>
                </div>

                {/* Remaining Rows - Two Items per Row */}
                <div className="grid w-full max-w-2xl grid-cols-2 gap-x-16 gap-y-10">
                    {learningPaths.slice(1).map((path) => (
                        <div key={path.id} className="flex flex-col items-center space-y-2">
                            <span className="text-center text-sm font-bold text-pink-900">{path.title}</span>
                            <Link href={categories[path.id] ? `/lessons?category=${path.id}&lesson=0` : "#"} className={`flex aspect-square w-full flex-col items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${getCategoryStyle(path.id)}`}>
                                <Image src={path.icon} alt={path.title} width={96} height={96} className="h-24 w-24" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
