import React from 'react';
import { Bell, Menu, X } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { currentUser } from '../../data/mockData';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none mr-2"
            aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-[#334e68]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
            <h1 className="text-xl font-bold text-[#334e68]">ConstructFlow</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center">
            <Avatar 
              src={currentUser.avatar} 
              name={currentUser.name} 
              size="sm" 
              className="cursor-pointer"
            />
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
              <p className="text-xs text-gray-500">{currentUser.role === 'owner' ? 'Arquiteto' : currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;