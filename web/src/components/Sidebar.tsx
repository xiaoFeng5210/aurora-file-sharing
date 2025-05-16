import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PageType } from '../types';

// 图标组件
const FolderIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
  </svg>
);

const UploadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);

interface SidebarProps {
  currentPage: PageType;
}

const Sidebar = ({ currentPage }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { id: 'files', to: '/files', name: '我的文件', icon: <FolderIcon /> },
    { id: 'share', to: '/share', name: '分享链接', icon: <ShareIcon /> },
    { id: 'upload', to: '#', name: '上传文件', icon: <UploadIcon /> },
    { id: 'settings', to: '#', name: '设置', icon: <SettingsIcon /> }
  ];

  return (
    <aside
      className={`bg-gradient-to-b from-indigo-700 to-purple-800 text-white shadow-xl transition-all duration-300 ease-in-out 
        ${collapsed ? 'w-16' : 'w-64'} z-30 flex flex-col`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-indigo-500/30">
        <Link to="/" className={`text-xl font-bold flex items-center gap-2 ${collapsed ? 'hidden' : 'flex'}`}>
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
            Aurora Share
          </span>
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={collapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"}></path>
          </svg>
        </button>
      </div>

      <nav className="mt-6 flex-1 overflow-y-auto">
        <ul className="space-y-1.5 px-3">
          {navItems.map(item => (
            <li key={item.id}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${currentPage === item.id
                    ? 'bg-white/20 text-white font-medium shadow-sm'
                    : 'text-indigo-100 hover:bg-white/10'}`}
              >
                <div className={`${currentPage === item.id ? 'text-white' : 'text-indigo-200'}`}>
                  {item.icon}
                </div>
                <span className={`truncate ${collapsed ? 'hidden' : 'block'}`}>{item.name}</span>
                {currentPage === item.id && !collapsed && (
                  <span className="ml-auto w-1.5 h-5 rounded-full bg-white"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto border-t border-indigo-500/30">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-300 to-purple-300 flex items-center justify-center text-indigo-800 font-medium">
              U
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-indigo-700"></div>
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium text-sm">用户</p>
              <p className="text-xs text-indigo-200">user@example.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 
