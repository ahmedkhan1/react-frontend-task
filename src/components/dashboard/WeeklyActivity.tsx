import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface WeeklyActivityProps {
  isLoading?: boolean;
}

interface WeeklyData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderRadius: number;
  }[];
}

const WeeklyActivity: React.FC<WeeklyActivityProps> = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const fetchWeeklyActivity = async () => {
      try {
        const response = await axios.get('https://api.devincilabs.com/api/v1/user/weekly-activity');
        setWeeklyData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load weekly activity');
        console.error('Error fetching weekly activity:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyActivity();

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
          <h2 className="text-xl font-semibold">Weekly Activity</h2>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-[25px] shadow-sm">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Weekly Activity</h2>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-[25px] shadow-sm text-center text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Weekly Activity</h2>
      </div>
      <div className="bg-white p-4 lg:p-6 rounded-[25px] shadow-sm">
        <div style={{ height: '240px' }}>
          <Bar 
            ref={chartRef}
            data={weeklyData!} 
            options={{ 
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;