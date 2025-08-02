import { useState } from 'react';

const Navbar = ({ 
  isLoggedIn, 
  user, 
  onLogout, 
  onNavigateToLogin, 
  onNavigateToSignup, 
  onNavigateToHome,
  onNavigateToDashboard,
  onNavigateToReminders,
  onNavigateToAICompanion,
  currentPage 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsProfileDropdownOpen(false);
  };

  const handleLoginClick = () => {
    onNavigateToLogin();
    setIsMobileMenuOpen(false);
  };

  const handleSignupClick = () => {
    onNavigateToSignup();
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    onNavigateToHome();
    setIsMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    onNavigateToDashboard();
    setIsMobileMenuOpen(false);
  };

  const handleRemindersClick = () => {
    onNavigateToReminders();
    setIsMobileMenuOpen(false);
  };

  const handleAICompanionClick = () => {
    onNavigateToAICompanion();
    setIsMobileMenuOpen(false);
  };

  // Navigation links for logged-out users
  const loggedOutLinks = [
    { name: 'Home', onClick: handleHomeClick },
    { name: 'AI Companion', onClick: handleAICompanionClick },
    { name: 'Reminders', onClick: handleRemindersClick }
  ];

  // Navigation links for logged-in users
  const loggedInLinks = [
    { name: 'Home', onClick: handleHomeClick },
    { name: 'Dashboard', onClick: handleDashboardClick },
    { name: 'AI Companion', onClick: handleAICompanionClick },
    { name: 'Reminders', onClick: handleRemindersClick }
  ];

  const currentLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleHomeClick}
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Edvora
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {currentLinks.map((link) => {
                // Determine if this link is the current page
                const isActive =
                  (link.name === 'Home' && currentPage === 'home') ||
                  (link.name === 'Dashboard' && currentPage === 'dashboard') ||
                  (link.name === 'Reminders' && currentPage === 'reminders') ||
                  (link.name === 'AI Companion' && currentPage === 'ai-companion');
                return (
                  <button
                    key={link.name}
                    onClick={link.onClick}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-indigo-700 font-bold underline underline-offset-8 decoration-2'
                        : 'text-gray-700 hover:text-indigo-600'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:block">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-indigo-600 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {currentLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.onClick}
                className="text-gray-700 hover:text-indigo-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </button>
            ))}
            
            {!isLoggedIn ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <button
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-indigo-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-2"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-gray-700 font-medium">{user?.name || 'User'}</span>
                </div>
                <a href="/profile" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
                  View Profile
                </a>
                <a href="/settings" className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-indigo-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 