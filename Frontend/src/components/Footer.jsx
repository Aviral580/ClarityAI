import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  Product: [
    { name: 'Features', path: '/features' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Calendar', path: '/calendar' },
  ],
  Company: [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  Resources: [
    { name: 'Settings', path: '/settings' },
    { name: 'Daily Summary', path: '/summary' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black from-transparent to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <a href="/">
              <motion.div 
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  Aura<span className="text-indigo-500">AI</span>
                </span>
              </motion.div>
            </a>
            <p className="max-w-sm mb-6 text-white">
              Your AI-powered executive assistant that transforms the way you plan, 
              organize, and conquer your day.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-white/5 hover:bg-white/10 text-white hover:text-indigo-400"
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
              <h3 className="font-semibold mb-4 text-white">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <a href={link.path}>
                      <motion.span
                        className="inline-block transition-colors text-white hover:text-indigo-400"
                        whileHover={{ x: 4 }}
                      >
                        {link.name}
                      </motion.span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} AuraAI. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white hover:text-indigo-400">
                Privacy Policy
              </a>
              <a href="#" className="text-white hover:text-indigo-400">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
