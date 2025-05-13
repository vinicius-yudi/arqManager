import React from 'react';
import { Home, LayoutDashboard, ClipboardList, Users, PieChart, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'Início', href: '/' },
    { icon: <LayoutDashboard size={20} />, label: 'Projetos', href: '/projects' },
    { icon: <ClipboardList size={20} />, label: 'Tarefas', href: '/tasks' },
    { icon: <Users size={20} />, label: 'Equipe', href: '/team' },
    { icon: <PieChart size={20} />, label: 'Relatórios', href: '/reports' },
    { icon: <Settings size={20} />, label: 'Configurações', href: '/settings' },
  ];

  return (
    <aside 
      className={`bg-white border-r border-gray-200 fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6">
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
        
        <nav className="mt-6 flex-1 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === item.href
                      ? 'bg-[#f0f4f8] text-[#334e68]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 mt-auto border-t border-gray-200">
          <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 w-full">
            <LogOut size={20} className="mr-3" />
            Sair
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;