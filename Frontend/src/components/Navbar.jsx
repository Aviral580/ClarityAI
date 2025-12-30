import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, } from 'lucide-react'; // Added icons
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Clarity<span className="text-indigo-500">AI</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav (Main Links) */}
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

          {/* Right Section: Auth & Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 mr-2">
              {/* Login Link - Ghost Style */}
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isDark 
                    ? 'text-slate-300 hover:text-white hover:bg-white/5' 
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100'
                  }`}
                >
                  Login
                </motion.button>
              </Link>

              {/* Signup Link - CTA Gradient Style */}
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold shadow-md hover:brightness-110 transition-all"
                >
                  Sign Up
                </motion.button>
              </Link>
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
            className={`lg:hidden border-t ${isDark ? 'bg-slate-900/98 border-white/5' : 'bg-white/98 border-slate-100'} backdrop-blur-xl`}
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium ${
                      isActive(link.path)
                        ? 'bg-indigo-500/10 text-indigo-500'
                        : isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-slate-500/10">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className={`w-full py-3 rounded-xl font-medium text-center ${isDark ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-900'}`}>
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 rounded-xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}