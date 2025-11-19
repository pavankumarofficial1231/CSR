import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, Building, HeartHandshake } from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if we are on the login page (which is now root '/')
  const isLoginPage = location.pathname === '/';
  
  // Get role from localStorage (persisted) or state (direct nav) or default to COMPANY
  const storedRole = localStorage.getItem('csrUserRole') as UserRole;
  const userRole = location.state?.role || storedRole || UserRole.COMPANY;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Navigation Links based on Role
  const getNavLinks = () => {
    const baseLinks = [{ name: 'Dashboard', path: '/dashboard' }];
    
    if (userRole === UserRole.NGO) {
      return [
        ...baseLinks,
        { name: 'Submit Proposal', path: '/submit-proposal' },
        { name: 'Track Status', path: '/track-status' },
        { name: 'Contact', path: '/dashboard#contact' },
      ];
    } else {
      // Company Role
      return [
        ...baseLinks,
        { name: 'Impact Reports', path: '/impact-reports' },
        { name: 'Sectors', path: '/dashboard#sectors' },
        { name: 'Contact', path: '/dashboard#contact' },
      ];
    }
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    localStorage.removeItem('csrUserRole'); // Clear session
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-csrBlue/80 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-default">
          <div className="w-8 h-8 bg-csrOrange rounded-lg rotate-3 flex items-center justify-center">
            <span className="text-white font-bold text-lg -rotate-3">C</span>
          </div>
          <span className="text-white">CSR<span className="text-csrOrange">Impact</span></span>
        </div>

        {/* If it's the login page, show nothing else */}
        {!isLoginPage && (
          <>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-gray-300 hover:text-csrOrange transition-colors font-medium text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Action Button (Profile/Logout) */}
            <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-3 mr-4 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                   {userRole === UserRole.NGO ? <HeartHandshake size={16} className="text-blue-400"/> : <Building size={16} className="text-csrOrange"/>}
                   <span className="text-xs font-semibold text-gray-300">
                      {userRole === UserRole.NGO ? 'NGO Partner' : 'Corporate Partner'}
                   </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white">
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {!isLoginPage && mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-csrBlue/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="text-gray-300 hover:text-csrOrange py-2 text-lg font-medium"
            >
              {link.name}
            </Link>
          ))}
          <button onClick={handleLogout} className="w-full bg-white/10 text-white py-3 rounded-xl font-bold mt-2 flex items-center justify-center gap-2">
             <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};