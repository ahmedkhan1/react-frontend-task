import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, Landmark, User } from 'lucide-react';
import paypalIcon from '../../assets/paypal-icon.png';
import paymentIcon from '../../assets/payment-icon.png';
import cardIcon from '../../assets/card-icon.png';
import Loader from '../Loader';

interface Transaction {
  name: string;
  amount: string;
  type: string;
  action: string;
  date: string;
}

interface RecentTransactionsProps {
  isLoading?: boolean;
}

const getTransactionIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'card':
      return cardIcon;
    case 'paypal':
      return paypalIcon;
    case 'cash':
      return paymentIcon;
    default:
      return paymentIcon;
  }
};

const getIconBackground = (type: string) => {
  switch (type.toLowerCase()) {
    case 'card':
      return 'bg-orange-100';
    case 'paypal':
      return 'bg-blue-100';
    case 'cash':
      return 'bg-green-100';
    default:
      return 'bg-gray-100';
  }
};

const RecentTransactions: React.FC<RecentTransactionsProps> = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://api.devincilabs.com/api/v1/user/transactions');
        setTransactions(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-[25px] shadow-sm p-4 lg:p-6">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[25px] p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[25px] shadow-sm p-4 lg:p-6">
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={`${transaction.name}-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3 lg:gap-4">
              <div className={`p-2 lg:p-3 rounded-full ${getIconBackground(transaction.type)}`}>
                <img
                  src={getTransactionIcon(transaction.type)}
                  alt={transaction.type}
                  className="w-5 h-5 lg:w-6 lg:h-6"
                />
              </div>
              <div>
                <p className="font-medium text-sm lg:text-base">
                  {transaction.name}
                </p>
                <p className="text-xs lg:text-sm text-gray-500">
                  {transaction.date}
                </p>
              </div>
            </div>
            <p
              className={`font-medium text-sm lg:text-base ${
                transaction.action === 'deposited' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {transaction.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;