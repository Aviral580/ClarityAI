import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, LogOut, User as UserIcon } from 'lucide-react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useAuth } from '../context/AuthContext'; // Import your Auth Context
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'About', path: '/about' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();
  const { user, setUser } = useAuth(); // Get user and setUser from context
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
     
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null); 
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
         
          <Link to="/">
            <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Clarity<span className="text-indigo-500">AI</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? isDark ? 'text-white' : 'text-indigo-600'
                      : isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 -z-10"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>


          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 mr-2">
              
              {user ? (
                 
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                    <UserIcon className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  
                  <motion.button
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </motion.button>
                </div>
              ) : (
              
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                        isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-indigo-600'
                      }`}
                    >
                      Login
                    </motion.button>
                  </Link>

                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            <ThemeToggle />
            
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-xl ${isDark ? 'text-white' : 'text-slate-800'}`}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-100'} backdrop-blur-xl`}
          >
            <div className="px-4 py-6 space-y-2">
              {/* User Identity in Mobile */}
              {user && (
                <div className={`px-4 py-3 mb-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-white/5' : 'bg-slate-50'}`}>
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.username}</span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </div>
              )}

              {navLinks.map((link, index) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium ${
                    isActive(link.path) ? 'bg-indigo-500/10 text-indigo-500' : isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-slate-500/10">
                {user ? (
                   <button onClick={handleLogout} className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-red-500/10 text-red-500">
                      <LogOut className="w-5 h-5" /> Logout
                   </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button className={`w-full py-3 rounded-xl font-medium ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}>Login</button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <button className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white">Sign Up</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}