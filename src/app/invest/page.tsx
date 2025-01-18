'use client';

import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { useCoin } from '../contexts/CoinContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Invest() {
  const [selectedType, setSelectedType] = useState<'ETF' | 'GIC' | 'STOCK' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [portfolio, setPortfolio] = useState({
    ETF: 0,
    GIC: 0,
    STOCK: 0,
  });
  const { coins, setCoins } = useCoin();
  const [earnings, setEarnings] = useState<number[]>([10000]); // Historical earnings data
  const [searchResults, setSearchResults] = useState<any[]>([]); // Will store API results
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  // Mock data for charts
  const lineChartData = {
    labels: earnings.map((_, index) => `Day ${index + 1}`),
    datasets: [{
      label: 'Portfolio Value',
      data: earnings,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const pieChartData = {
    labels: ['ETFs', 'GICs', 'Stocks'],
    datasets: [{
      data: [portfolio.ETF, portfolio.GIC, portfolio.STOCK],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ]
    }]
  };

  // Mock function to fetch investment options
  const fetchInvestmentOptions = async (type: string, query: string) => {
    // Replace with actual API call
    const mockData = [
      { id: 1, name: `${type} Option 1`, price: 100 },
      { id: 2, name: `${type} Option 2`, price: 200 },
      { id: 3, name: `${type} Option 3`, price: 300 },
    ];
    setSearchResults(mockData);
  };

  const handleTypeSelect = (type: 'ETF' | 'GIC' | 'STOCK') => {
    setSelectedType(type);
    setSearchQuery('');
    fetchInvestmentOptions(type, '');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchInvestmentOptions(selectedType!, query);
  };

  const handleBuy = (item: any) => {
    if (investmentAmount <= 0 || investmentAmount > coins) {
      alert('Invalid investment amount');
      return;
    }

    setCoins(coins - investmentAmount);
    setPortfolio(prev => ({
      ...prev,
      [selectedType!]: prev[selectedType!] + investmentAmount
    }));
    setEarnings(prev => [...prev, prev[prev.length - 1] + (investmentAmount * 0.1)]); // Mock 10% return
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Charts Row */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="p-4 border rounded-lg">
          <Line data={lineChartData} />
        </div>
        <div className="p-4 border rounded-lg">
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Investment Type Selection */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleTypeSelect('ETF')}
          className={`px-4 py-2 rounded ${selectedType === 'ETF' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          ETFs
        </button>
        <button
          onClick={() => handleTypeSelect('GIC')}
          className={`px-4 py-2 rounded ${selectedType === 'GIC' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          GICs
        </button>
        <button
          onClick={() => handleTypeSelect('STOCK')}
          className={`px-4 py-2 rounded ${selectedType === 'STOCK' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
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
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={`Search ${selectedType}s...`}
            className="w-full p-2 border rounded mb-4"
          />
          
          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((item) => (
              <div key={item.id} className="p-4 border rounded flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>Price: ${item.price}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    placeholder="Amount to invest"
                    className="p-2 border rounded"
                  />
                  <button
                    onClick={() => handleBuy(item)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
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

