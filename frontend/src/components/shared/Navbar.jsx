import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-cyan-50/80 backdrop-blur-xl border-b border-cyan-100/50 px-4 md:px-8 py-4 flex items-center justify-between">
      {/* Brand & Desktop Links */}
      <div className="flex items-center gap-10">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tighter text-cyan-900 select-none active:scale-95 transition-transform" 
          onClick={() => setIsOpen(false)}
        >
          PetAdopt
        </Link>
        
        {/* Desktop Navigation (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm text-cyan-800/70">
          <Link to="/" className="hover:text-cyan-900 transition-colors">Home</Link>
          <Link to="/pets" className="hover:text-cyan-900 transition-colors">Browse</Link>
          <Link to="/about" className="hover:text-cyan-900 transition-colors">About</Link>
        </div>
      </div>

      {/* Control Groups */}
      <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
        
        {/* Notification Bell (Visible everywhere for real-time responsiveness) */}
        <Link 
          to="/notifications" 
          className="relative w-10 h-10 flex items-center justify-center text-cyan-800/60 hover:text-cyan-900 hover:bg-cyan-100/40 rounded-full transition-all" 
          onClick={() => setIsOpen(false)}
          aria-label="View notifications"
        >
          <span className="material-symbols-outlined text-2xl">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-cyan-50">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Favorites Heart (Desktop Only - collapsed to Drawer on Mobile to prevent layout clutter) */}
        <Link 
          to="/favorites" 
          className="hidden md:flex w-10 h-10 items-center justify-center text-cyan-800/60 hover:text-cyan-900 hover:bg-cyan-100/40 rounded-full transition-all"
          aria-label="View favorites"
        >
          <span className="material-symbols-outlined text-2xl">favorite</span>
        </Link>
        
        {/* Desktop Authenticated / Login Controls */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link 
                to="/profile" 
                className="bg-[#00656f] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#00525a] transition-all"
              >
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="text-[#00656f] font-bold text-sm hover:text-[#004d54] transition-colors px-2 h-10"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-[#00656f] text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-[#00525a] transition-all">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu Button (Touch Target Optimized at 44x44px) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-11 h-11 flex items-center justify-center text-cyan-800 hover:text-cyan-950 hover:bg-cyan-100/40 active:scale-95 rounded-full transition-all focus:outline-none"
          aria-label="Toggle navigation menu"
          id="hamburger-menu-btn"
        >
          <span className="material-symbols-outlined text-2xl">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Glassmorphic Navigation Drawer */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 w-full bg-cyan-50/95 backdrop-blur-2xl border-b border-cyan-100/80 px-6 py-6 flex flex-col gap-6 md:hidden shadow-lg animate-fadeIn z-50"
          id="mobile-nav-menu"
        >
          {/* Main Links */}
          <div className="flex flex-col font-bold text-base text-cyan-800">
            <Link 
              to="/" 
              className="hover:text-cyan-950 transition-colors py-3 border-b border-cyan-100/40 flex items-center justify-between" 
              onClick={() => setIsOpen(false)}
            >
              <span>Home</span>
              <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
            </Link>
            <Link 
              to="/pets" 
              className="hover:text-cyan-950 transition-colors py-3 border-b border-cyan-100/40 flex items-center justify-between" 
              onClick={() => setIsOpen(false)}
            >
              <span>Browse Pets</span>
              <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
            </Link>
            <Link 
              to="/about" 
              className="hover:text-cyan-950 transition-colors py-3 border-b border-cyan-100/40 flex items-center justify-between" 
              onClick={() => setIsOpen(false)}
            >
              <span>About Us</span>
              <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
            </Link>
            <Link 
              to="/favorites" 
              className="hover:text-cyan-950 transition-colors py-3 border-b border-cyan-100/40 flex items-center justify-between" 
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-2">
                Favorites <span className="material-symbols-outlined text-rose-500 text-lg">favorite</span>
              </span>
              <span className="material-symbols-outlined text-sm opacity-50">arrow_forward_ios</span>
            </Link>
          </div>

          {/* Authentication Actions */}
          <div className="flex flex-col gap-3 pt-2">
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="bg-[#00656f] text-white py-3.5 rounded-xl text-center text-sm font-bold shadow-md hover:bg-[#00525a] active:scale-[0.98] transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="border border-[#00656f]/30 text-[#00656f] py-3.5 rounded-xl text-center text-sm font-bold hover:bg-[#00656f]/5 active:scale-[0.98] transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-[#00656f] text-white py-3.5 rounded-xl text-center text-sm font-bold shadow-md hover:bg-[#00525a] active:scale-[0.98] transition-all"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
