import { useState } from 'react';

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

const NotificationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
  </svg>
);

const Header = () => {
  // const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-4 flex items-center justify-between shadow-sm">
      <div className="relative flex-1 max-w-xl">
        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="搜索文件或文件夹..."
          className="block w-full bg-slate-100 dark:bg-slate-700 border border-transparent dark:text-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-300 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
      </div>

      <div className="flex items-center gap-4 ml-4">
        <div className="relative hidden sm:block">
          <button className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <NotificationIcon />
          </button>
          <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></div>
        </div>

        <button className="hidden sm:flex bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span>新建文件夹</span>
        </button>

        <button className="md:hidden text-slate-600 dark:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <button className="flex text-slate-600 dark:text-slate-300 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-300 to-purple-300 flex items-center justify-center text-indigo-800 group-hover:ring-2 group-hover:ring-indigo-300 transition-all dark:from-indigo-600 dark:to-purple-600 dark:text-white">
            U
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header; 
