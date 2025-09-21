import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Determine if we should show the sidebar
  const showSidebar = isAuthenticated && (
    isAdmin || 
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/orders')
  );

  // Pages that should have a clean layout without sidebar
  const cleanLayoutPages = ['/login', '/register', '/'];
  const isCleanLayout = cleanLayoutPages.includes(location.pathname);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Always visible */}
      <Header onMobileMenuToggle={handleSidebarToggle} />

      <div className="flex">
        {/* Sidebar - Conditional */}
        {showSidebar && !isCleanLayout && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
            isAdmin={isAdmin}
          />
        )}

        {/* Main Content */}
        <main className={`flex-1 ${showSidebar && !isCleanLayout ? 'lg:ml-0' : ''}`}>
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Footer - Always visible */}
      <Footer />
    </div>
  );
};

export default Layout;