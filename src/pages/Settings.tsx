import React, { useState } from 'react';
import EditProfile from '../components/settings/EditProfile';
import Preferences from '../components/settings/Preferences';
import Security from '../components/settings/Security';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Edit Profile' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'security', label: 'Security' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <EditProfile />;
      case 'preferences':
        return <Preferences />;
      case 'security':
        return <Security />;
      default:
        return <EditProfile />;
    }
  };

  return (
    <div className="p-4 lg:p-8 mt-16 lg:mt-20">
      <div className="bg-white rounded-[25px] shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 pt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;