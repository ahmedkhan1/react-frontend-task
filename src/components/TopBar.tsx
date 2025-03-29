import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';

const TopBar = ({currentPage}) => {
  return (
    <div className="bg-white shadow-sm px-4 lg:px-8 py-4 fixed top-0 right-0 left-0 lg:left-64 z-10">
      <div className="flex justify-between items-center">
        <h1 className="top-bar text-xl lg:text-2xl font-bold">{currentPage === 'dashboard' ? 'Overview' : 'Settings'}</h1>
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="relative hidden md:block">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for something"
              className="pl-10 pr-4 py-2 rounded-[40px] bg-[#F5F7FA] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 lg:w-64"
            />
          </div>
          <button className="p-2 rounded-[40px] bg-gray-100 hover:bg-gray-200">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-[40px] bg-gray-100 hover:bg-gray-200">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
            alt="Profile"
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;