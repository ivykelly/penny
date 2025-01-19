"use client";

import { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import { useCoin } from "../contexts/CoinContext";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { stocksData } from "../data/stocks";
import { etfsData } from "../data/etfs";
import { gicsData } from "../data/gics";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

// const API_KEY = process.env.POLYGON_API_KEY;
// const POPULAR_TICKERS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'TSLA', 'NVDA', 'JPM', 'BAC', 'WMT'];

// Define the shape of the InvestmentItem
interface InvestmentItem {
    id: string;
    name: string;
    price: number;
}

// Define the shape of the Portfolio
interface Portfolio {
    ETF: { [key: string]: number };
    GIC: { [key: string]: number };
    STOCK: { [key: string]: number };
}

// Define the Invest component
export default function Invest() {
    const [selectedType, setSelectedType] = useState<"ETF" | "GIC" | "STOCK" | null>(null); // Define the selected type
    const [searchQuery, setSearchQuery] = useState(""); // Define the search query
    const [portfolio, setPortfolio] = useState<Portfolio>({
        ETF: {},
        GIC: {},
        STOCK: {},
    }); // Define the portfolio
    const { coins, setCoins } = useCoin(); // Get the user's coins
    const [earnings, setEarnings] = useState<number[]>([10000]); // Historical earnings data
    const [searchResults, setSearchResults] = useState<InvestmentItem[]>([]); // Will store API results
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Define the quantities

    // Calculate total value for pie chart
    const getTotalValue = (type: "ETF" | "GIC" | "STOCK") => {
        return Object.values(portfolio[type]).reduce((sum, amount) => sum + amount, 0);
    };

    // Mock data for charts
    const lineChartData = {
        labels: earnings.map((_, index) => `Day ${index + 1}`),
        datasets: [
            {
                label: "Portfolio Value",
                data: earnings,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    // Define the pie chart data
    const pieChartData = {
        labels: ["ETFs", "GICs", "Stocks"],
        datasets: [
            {
                data: [getTotalValue("ETF"), getTotalValue("GIC"), getTotalValue("STOCK")],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            },
        ],
    };

    //   const fetchStockPrice = async (ticker: string) => {
    //     const today = new Date();
    //     today.setDate(today.getDate() - 1); // Subtract one day
    //     const yesterday = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD

    //     try {
    //       const response = await fetch(
    //         `https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${yesterday}/${yesterday}?apiKey=qF3R8v1z1bT1_gQh8AWT9tA7C6Emd9Mz`
    //       );
    //       const data = await response.json();
    //       return data.results?.[0]?.c || null;
    //     } catch (error) {
    //       console.error(`Error fetching ${ticker}:`, error);
    //       return null;
    //     }
    //   };

    // Define the fetchInvestmentOptions function
    const fetchInvestmentOptions = async (type: string, query: string) => {
        if (type === "STOCK") { // If the selected type is stocks
            if (query) { // If there is a search query
                const filteredStocks = stocksData.filter((stock) => stock.ticker.toLowerCase().includes(query.toLowerCase()) || stock.name.toLowerCase().includes(query.toLowerCase())).slice(0, 15);
                setSearchResults( // Set the search results
                    filteredStocks.map( // Map the filtered stocks to the search results
                        (stock): InvestmentItem => ({ // Define the shape of the investment item
                            id: stock.ticker, // Define the id of the investment item
                            name: `${stock.name} (${stock.ticker})`, // Define the name of the investment item
                            price: stock.price, // Define the price of the investment item
                        }),
                    ),
                );
            } else {
                setSearchResults( // Set the search results
                    stocksData.slice(0, 15).map( // Map the stocks to the search results
                        (stock): InvestmentItem => ({ // Define the shape of the investment item
                            id: stock.ticker, // Define the id of the investment item
                            name: `${stock.name} (${stock.ticker})`, // Define the name of the investment item
                            price: stock.price, // Define the price of the investment item
                        }),
                    ),
                );
            }
        } else if (type === "ETF") { // If the selected type is etfs 
            const filtered = query ? etfsData.filter((etf) => etf.ticker.toLowerCase().includes(query.toLowerCase()) || etf.name.toLowerCase().includes(query.toLowerCase())).slice(0, 15) : etfsData.slice(0, 15);
            setSearchResults( // Set the search results
                filtered.map( // Map the filtered etfs to the search results
                    (etf): InvestmentItem => ({ // Define the shape of the investment item
                        id: etf.ticker, // Define the id of the investment item
                        name: `${etf.name} (${etf.ticker})`, // Define the name of the investment item
                        price: etf.price, // Define the price of the investment item
                    }),
                ),
            );
        } else if (type === "GIC") { 
            const filtered = query ? gicsData.filter((gic) => gic.name.toLowerCase().includes(query.toLowerCase())).slice(0, 15) : gicsData.slice(0, 15); // Filter the gics based on the search query
            setSearchResults( // Set the search results
                filtered.map( // Map the filtered gics to the search results
                    (gic): InvestmentItem => ({ // Define the shape of the investment item
                        id: gic.id, // Define the id of the investment item
                        name: `${gic.name} (${gic.rate}%)`, // Define the name of the investment item
                        price: 100,
                    }),
                ),
            );
        }
    };

    // Modify useEffect to run when type changes
    useEffect(() => {
        if (!selectedType) return;

        const timer = setTimeout(() => {
            fetchInvestmentOptions(selectedType, searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedType]);

    const handleTypeSelect = async (type: "ETF" | "GIC" | "STOCK") => {
        setSelectedType(type);
        setSearchQuery("");
        // Immediately fetch options when type is selected
        await fetchInvestmentOptions(type, "");
    };
    // Define the handleSearch function
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Define the handleBuy function
    const handleBuy = (item: InvestmentItem) => {
        const itemQuantity = quantities[item.id] || 0;
        const totalCost = item.price * itemQuantity;

        if (itemQuantity <= 0 || totalCost > coins) { // If the quantity is less than or equal to 0 or the total cost is greater than the user's coins
            alert("Invalid quantity or insufficient funds"); // Alert the user
            return; // Return from the function
        }

        setCoins(coins - totalCost);
        setPortfolio((prev) => ({
            ...prev,
            [selectedType!]: {
                ...prev[selectedType!],
                [item.id]: (prev[selectedType!][item.id] || 0) + itemQuantity,
            },
        }));

        // Update earnings based on investment type
        const returnRate = selectedType === "GIC" ? 0.05 : 0.1;
        setEarnings((prev) => [...prev, prev[prev.length - 1] + totalCost * returnRate]);

        // Reset quantity after purchase
        setQuantities((prev) => ({
            ...prev,
            [item.id]: 0,
        }));
    };

    // Return the Invest component
    return (
        <div className="mx-auto max-w-7xl p-4">
            {/* Charts Row */}
            <div className="mb-8 flex flex-col gap-4">
                <div className="rounded-lg border p-4">
                    <Line data={lineChartData} />
                </div>
                <div className="rounded-lg border p-4">
                    <Pie data={pieChartData} />
                </div>
            </div>

            {/* Investment Type Selection */}
            <div className="mb-4 flex gap-4">
                <button onClick={() => handleTypeSelect("ETF")} className={`rounded px-4 py-2 ${selectedType === "ETF" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    ETFs
                </button>
                <button onClick={() => handleTypeSelect("GIC")} className={`rounded px-4 py-2 ${selectedType === "GIC" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    GICs
                </button>
                <button onClick={() => handleTypeSelect("STOCK")} className={`rounded px-4 py-2 ${selectedType === "STOCK" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    Stocks
                </button>
            </div>

            {/* Balance Display */}
            <div className="mb-4">
                <p className="text-lg font-bold">Available Balance: ${coins}</p>
            </div>

            {/* Search and Results */}
            {selectedType && (
                <div className="mb-4">
                    <input type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder={`Search ${selectedType}s...`} className="mb-4 w-full rounded border p-2" />

                
                    <div className="grid grid-cols-1 gap-4">
                        {searchResults.map((item) => (
                            <div key={item.id} className="flex items-center justify-between rounded border p-4">
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p>Price: ${item.price}</p>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={quantities[item.id] || 0}
                                        onChange={(e) =>
                                            setQuantities((prev) => ({
                                                ...prev,
                                                [item.id]: Number(e.target.value),
                                            }))
                                        }
                                        placeholder="Quantity"
                                        className="rounded border p-2"
                                    />
                                    <button onClick={() => handleBuy(item)} className="rounded bg-green-500 px-4 py-2 text-white">
                                        Buy
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
