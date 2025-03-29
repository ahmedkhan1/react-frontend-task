import React from 'react';
import MyCards from '../components/dashboard/MyCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ExpenseStatistics from '../components/dashboard/ExpenseStatistics';
import BalanceHistory from '../components/dashboard/BalanceHistory';
import QuickTransfer from '../components/dashboard/QuickTransfer';
import WeeklyActivity from '../components/dashboard/WeeklyActivity';



const Dashboard: React.FC<any> = () => {
  return (
    <div className="p-4 lg:p-8 mt-16 lg:mt-20">
      {/* Cards and Transactions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Cards</h2>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">See All</a>
          </div>
          <MyCards />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Transaction</h2>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">See All</a>
          </div>
          <RecentTransactions />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-8">
        <WeeklyActivity />
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expense Statistics</h2>
          </div>
          <ExpenseStatistics />
        </div>
      </div>

      {/* Balance History and Quick Transfer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <QuickTransfer />
        <BalanceHistory />
      </div>
    </div>
  );
};

export default Dashboard;