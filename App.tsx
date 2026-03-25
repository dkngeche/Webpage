
import React, { useState, useEffect } from 'react';
import { StoreProvider } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/Public/HomePage';
import ServicesPage from './pages/Public/ServicesPage';
import HowIWorkPage from './pages/Public/HowIWorkPage';
import AuditPage from './pages/Public/AuditPage';
import LoginPage from './pages/Admin/LoginPage';
import AdminDashboard from './pages/Admin/Dashboard';
import LeadManagement from './pages/Admin/LeadManagement';
import CMSManager from './pages/Admin/CMSManager';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#home');
  const [isAuthenticated, setIsAuthenticated] = useState(() => 
    sessionStorage.getItem('dn_admin_auth') === 'true'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0); // Ensure page starts at the top on navigation
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = (password: string) => {
    if (password === '100Milli@31') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dn_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('dn_admin_auth');
    window.location.hash = '#home';
  };

  const isAdminRoute = route.startsWith('#admin');

  const renderRoute = () => {
    if (isAdminRoute && !isAuthenticated) {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (route) {
      case '#services': return <ServicesPage />;
      case '#how-i-work': return <HowIWorkPage />;
      case '#audit': return <AuditPage />;
      case '#admin': return <AdminDashboard onLogout={handleLogout} />;
      case '#admin/leads': return <LeadManagement onLogout={handleLogout} />;
      case '#admin/cms': return <CMSManager onLogout={handleLogout} />;
      case '#home':
      default: return <HomePage />;
    }
  };

  return (
    <StoreProvider>
      <div className="flex flex-col min-h-screen">
        {(!isAdminRoute || (isAdminRoute && !isAuthenticated)) && <Navbar currentRoute={route} />}
        <main className={`flex-grow ${(!isAdminRoute || (isAdminRoute && !isAuthenticated)) ? 'pt-20' : ''}`}>
          {renderRoute()}
        </main>
        {(!isAdminRoute || (isAdminRoute && !isAuthenticated)) && <Footer />}
      </div>
    </StoreProvider>
  );
};

export default App;
