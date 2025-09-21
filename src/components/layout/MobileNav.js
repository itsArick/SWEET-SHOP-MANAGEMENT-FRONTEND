import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  User, 
  Menu,
  X,
  Heart,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../hooks/useCart';
import Badge from '../common/Badge';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/sweets', label: 'Browse', icon: Package },
    { 
      path: '/cart', 
      label: 'Cart', 
      icon: ShoppingCart,
      badge: itemCount > 0 ? itemCount : null
    },
    ...(isAuthenticated ? [
      { path: '/orders', label: 'Orders', icon: Heart },
      { path: '/profile', label: 'Profile', icon: User },
    ] : []),
    ...(isAdmin ? [
      { path: '/admin', label: 'Admin', icon: Settings },
    ] : []),
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 lg:hidden">
        <div className="grid grid-cols-5 h-16">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center relative ${
                isActive(item.path)
                  ? 'text-primary-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="danger"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs bg-red-500 text-white"
                >
                  {item.badge > 99 ? '99+' : item.badge}
                </Badge>
              )}
            </Link>
          ))}
          
          {/* Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Expanded Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMenu} />
          <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 max-h-80 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Menu</h3>
              <div className="space-y-2">
                {navItems.slice(4).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMenu}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
                
                {/* Additional Menu Items */}
                <Link
                  to="/favorites"
                  onClick={toggleMenu}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Favorites
                </Link>
                
                <Link
                  to="/settings"
                  onClick={toggleMenu}
                  className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;