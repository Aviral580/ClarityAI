import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeContext';

export default function Signup() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
      
      {/* Left Side: Visual/Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 relative overflow-hidden flex-col justify-center px-20">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600 to-purple-700" />
        
        {/* Animated Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full" 
        />
        
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
              <Sparkles className="text-white w-7 h-7" />
            </div>
            <span className="text-2xl font-bold text-white">Clarity AI</span>
          </motion.div>
          
          <h2 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Turn your ideas <br /> into <span className="text-indigo-200">reality.</span>
          </h2>
          
          <div className="space-y-4">
            {['Free 14-day trial', 'No credit card required', 'Full API access'].map((text, i) => (
              <motion.div 
                key={text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-3 text-indigo-100"
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-300" />
                <span className="text-lg">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10">
            <h1 className={`text-4xl font-black mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Get Started</h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>Join 10,000+ developers building with Clarity AI.</p>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>First Name</label>
                <input type="text" placeholder="John" className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-white focus:ring-2 ring-indigo-500/20 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'}`} />
              </div>
              <div className="space-y-2">
                <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Last Name</label>
                <input type="text" placeholder="Doe" className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-white focus:ring-2 ring-indigo-500/20 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'}`} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="email" placeholder="john@example.com" className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-white focus:ring-2 ring-indigo-500/20 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'}`} />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input type="password" placeholder="Create a password" className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-white focus:ring-2 ring-indigo-500/20 focus:border-indigo-500' : 'bg-slate-50 border-slate-200 focus:border-indigo-500'}`} />
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5">
                Create Account
              </button>
            </div>
          </form>

          <p className={`mt-8 text-center text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Already have an account? <Link to="/login" className="text-indigo-500 font-bold hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}