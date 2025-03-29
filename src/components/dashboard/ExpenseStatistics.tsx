import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import Loader from '../Loader';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseStatisticsProps {
  isLoading?: boolean;
}

interface ExpenseData {
  labels: string[];
  data: number[];
}

const ExpenseStatistics: React.FC<ExpenseStatisticsProps> = () => {
  const [expenseData, setExpenseData] = useState<ExpenseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const fetchExpenseStats = async () => {
      try {
        const response = await axios.get('https://api.devincilabs.com/api/v1/user/expense-stats');
        setExpenseData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load expense statistics');
        console.error('Error fetching expense stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseStats();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-[25px] shadow-sm">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-[25px] shadow-sm text-center text-red-600">
        {error}
      </div>
    );
  }

  const chartData = {
    labels: expenseData?.labels || [],
    datasets: [{
      data: expenseData?.data || [],
      backgroundColor: [
        'rgb(59, 130, 246)', // Entertainment - Blue
        'rgb(37, 99, 235)',  // Investment - Darker Blue
        'rgb(249, 115, 22)', // Bill Expense - Orange
        'rgb(17, 24, 39)',   // Others - Dark Gray
      ],
      borderWidth: 0,
    }],
  };

  return (
    <div className="bg-white p-6 rounded-[25px] shadow-sm">
      <div className="flex items-center justify-center" style={{ height: '240px' }}>
        <Pie 
          ref={chartRef}
          data={chartData} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              }
            }
          }} 
        />
      </div>
    </div>
  );
};

export default ExpenseStatistics;