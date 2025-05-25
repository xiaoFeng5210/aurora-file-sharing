import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  // const location = useLocation();
  // const currentPage = location.pathname === '/' || location.pathname === '/files' ? 'files' : 'share';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* <Sidebar currentPage={currentPage} /> */}
      <div className="flex flex-col flex-1 overflow-hidden bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="flex-1">
          <div className="w-full h-full p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout
