import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import axios from 'axios';
import Loader from '../Loader';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BalanceHistoryProps {
  isLoading?: boolean;
}

interface BalanceData {
  labels: string[];
  data: number[];
}

const BalanceHistory: React.FC<BalanceHistoryProps> = () => {
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const fetchBalanceHistory = async () => {
      try {
        const response = await axios.get('https://api.devincilabs.com/api/v1/user/balance');
        setBalanceData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load balance history');
        console.error('Error fetching balance history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceHistory();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Balance History</h2>
        </div>
        <div className="bg-white p-6 rounded-[25px] shadow-sm h-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Balance History</h2>
        </div>
        <div className="bg-white p-6 rounded-[25px] shadow-sm h-full text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  const chartData = {
    labels: balanceData?.labels || [],
    datasets: [
      {
        label: 'Balance',
        data: balanceData?.data || [],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Balance History</h2>
      </div>
      <div className="bg-white p-6 rounded-[25px] shadow-sm h-full">
        <Line
          ref={chartRef}
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BalanceHistory;