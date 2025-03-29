import React from 'react';
import {
  Home,
  Settings,
  User,
  TrendingUp,
  CreditCard as CardIcon,
  Landmark,
  Settings2,
  X,
} from 'lucide-react';
import Transfer from '../assets/17-transfer.png';
import BrandLogo from '../assets/brand-logo.png';

import UserAccount from '../assets/user.png';
import investment from '../assets/economic-investment.png';
import creditCard from '../assets/credit-card.png';
import loan from '../assets/loan.png';
import service from '../assets/service.png';
import privileges from '../assets/econometrics.png';

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage?: string;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose, onNavigate, currentPage = 'dashboard' }) => {
  const getMenuItemClass = (page: string) => {
    const baseClass = "flex items-center gap-3 p-3 rounded-lg";
    return currentPage === page
      ? `${baseClass} text-black-600 bg-black-50`
      : `${baseClass} text-gray-400 hover:bg-gray-50`;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed left-0 top-0 h-full bg-white shadow-lg p-4 z-50 transition-transform duration-300
        w-64 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img src={BrandLogo} className="w-6 h-6 text-blue-600" alt="Brand Logo" />
            <span className="font-bold text-xl">Soar Task</span>
          </div>
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="space-y-1">
          <a
            href="#"
            onClick={() => onNavigate('dashboard')}
            className={getMenuItemClass('dashboard')}
          >
            <Home className="w-5 h-5" />
            <span className="flex-1">Dashboard</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('transactions')}
            className={getMenuItemClass('transactions')}
          >
            <img src={Transfer} className="w-5 h-5" alt="Transactions" />
            <span className="flex-1">Transactions</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('accounts')}
            className={getMenuItemClass('accounts')}
          >
            <img src={UserAccount} className="w-5 h-5" alt="Accounts" />
            <span className="flex-1">Accounts</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('investments')}
            className={getMenuItemClass('investments')}
          >
            <img src={investment} className="w-5 h-5" alt="Investments" />
            <span className="flex-1">Investments</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('cards')}
            className={getMenuItemClass('cards')}
          >
            <img src={creditCard} className="w-5 h-5" alt="Credit Cards" />
            <span className="flex-1">Credit Cards</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('loans')}
            className={getMenuItemClass('loans')}
          >
            <img src={loan} className="w-5 h-5" alt="Loans" />
            <span className="flex-1">Loans</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('services')}
            className={getMenuItemClass('services')}
          >
            <img src={service} className="w-5 h-5" alt="Services" />
            <span className="flex-1">Services</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('privileges')}
            className={getMenuItemClass('privileges')}
          >
            <img src={privileges} className="w-5 h-5" alt="Privileges" />
            <span className="flex-1">My Privileges</span>
          </a>
          <a
            href="#"
            onClick={() => onNavigate('settings')}
            className={getMenuItemClass('settings')}
          >
            <Settings className="w-5 h-5" />
            <span className="flex-1">Setting</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default SideBar;