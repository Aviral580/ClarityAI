import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { Clock, CheckCircle2 } from 'lucide-react';

export default function TaskBlock({ 
  title, 
  time, 
  duration = 1, 
  priority = 'medium',
  completed = false,
  category = 'work'
}) {
  const { isDark } = useTheme();

  const priorityGradients = {
    high: 'from-rose-500 to-pink-600',
    medium: 'from-indigo-500 to-purple-600',
    low: 'from-teal-500 to-cyan-600',
  };

  const categoryColors = {
    work: 'from-indigo-500 to-purple-600',
    personal: 'from-rose-500 to-pink-600',
    health: 'from-emerald-500 to-teal-600',
    learning: 'from-amber-500 to-orange-600',
  };

  const heightClass = duration <= 0.5 ? 'h-12' : duration <= 1 ? 'h-20' : duration <= 2 ? 'h-32' : 'h-44';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className={`relative ${heightClass} rounded-xl overflow-hidden cursor-pointer group ${
        completed ? 'opacity-60' : ''
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[category] || priorityGradients[priority]}`} />
      
      <div className={`absolute inset-0 ${
        isDark ? 'bg-black/20' : 'bg-white/10'
      }`} />
      
      <div className="relative h-full p-3 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className={`font-semibold text-white text-sm leading-tight ${
            completed ? 'line-through' : ''
          }`}>
            {title}
          </span>
          {completed && (
            <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center gap-1 text-white/80">
          <Clock className="w-3 h-3" />
          <span className="text-xs">{time}</span>
        </div>
      </div>

      <motion.div 
        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  );
}