import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTAButton({ 
  children, 
  to = "#", 
  variant = 'primary', 
  className = '',
  icon: Icon,
  onClick
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40",
    secondary:
      "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20",
    outline:
      "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white",
  };

  const motionProps = {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  const ButtonContent = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </>
  );
  
  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...motionProps}
      >
        {ButtonContent}
      </motion.button>
    );
  }

 
  return (
    <Link to={to}>
      <motion.div
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...motionProps}
      >
        {ButtonContent}
      </motion.div>
    </Link>
  );
}
