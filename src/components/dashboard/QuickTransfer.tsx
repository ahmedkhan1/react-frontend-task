import React, { useState } from 'react';
import { ChevronRight, Send } from 'lucide-react';
import User1 from '../../assets/user-1.png';
import User2 from '../../assets/user-2.png';
import User3 from '../../assets/user-3.png';
import Loader from '../Loader';

interface QuickTransferProps {
  isLoading?: boolean;
}

const users = [
  { name: 'Livia Bator', role: 'CEO', image: User1 },
  { name: 'Randy Press', role: 'Director', image: User2 },
  { name: 'Workman', role: 'Designer', image: User3 },
];

const QuickTransfer: React.FC<QuickTransferProps> = ({ isLoading = false }) => {
  const [amount, setAmount] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleTransfer = () => {
    if (!amount) return;
    
    setShowToast(true);
    setAmount('');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Quick Transfer</h2>
        </div>
        <div className="bg-white p-4 lg:p-6 rounded-[25px] shadow-sm">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quick Transfer</h2>
      </div>
      <div className="bg-white p-4 lg:p-6 rounded-[25px] shadow-sm">
        <div className="flex gap-3 lg:gap-4 mb-6 overflow-x-auto pb-2">
          {users.map((user, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0">
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full mb-2"
              />
              <p className="text-sm font-medium whitespace-nowrap">{user.name}</p>
              <p className="text-xs text-gray-500 whitespace-nowrap">{user.role}</p>
            </div>
          ))}
          <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
          <input
            type="text"
            placeholder="Write amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleTransfer}
            className="px-6 py-2 bg-black text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        Transferred successfully!
      </div>
    </div>
  );
};

export default QuickTransfer;