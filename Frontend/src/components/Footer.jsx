import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { createPageUrl } from '../utils';
import { useTheme } from './ThemeContext';

const footerLinks = {
  Product: [
    { name: 'Features', path: 'Features' },
    { name: 'How It Works', path: 'HowItWorks' },
    { name: 'Dashboard', path: 'Dashboard' },
    { name: 'Calendar', path: 'Calendar' },
  ],
  Company: [
    { name: 'About', path: 'About' },
    { name: 'Contact', path: 'Contact' },
  ],
  Resources: [
    { name: 'Settings', path: 'Settings' },
    { name: 'Daily Summary', path: 'Summary' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`relative overflow-hidden ${
      isDark
        ? 'bg-gradient-to-b from-transparent to-slate-950'
        : 'bg-gradient-to-b from-transparent to-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to={createPageUrl('Home')}>
              <motion.div 
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Aura<span className="text-indigo-500">AI</span>
                </span>
              </motion.div>
            </Link>
            <p className={`max-w-sm mb-6 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Your AI-powered executive assistant that transforms the way you plan, 
              organize, and conquer your day.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`font-semibold mb-4 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={createPageUrl(link.path)}>
                      <motion.span
                        className={`inline-block transition-colors ${
                          isDark
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`mt-16 pt-8 border-t ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              © {new Date().getFullYear()} AuraAI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className={isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}>
                Privacy Policy
              </a>
              <a href="#" className={isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}