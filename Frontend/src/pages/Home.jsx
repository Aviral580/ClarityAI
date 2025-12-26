import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Calendar, CheckCircle2, Clock, Sparkles, Zap, Brain } from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';
import FeatureCard from '../components/FeatureCard';
import { useTheme } from '../components/ThemeContext';

function HeroMockup() {
  const { isDark } = useTheme();
  
  const tasks = [
    { title: 'Team standup meeting', time: '9:00 AM', status: 'done' },
    { title: 'Review project proposal', time: '10:30 AM', status: 'current' },
    { title: 'Lunch with Sarah', time: '12:00 PM', status: 'upcoming' },
    { title: 'Client presentation prep', time: '2:00 PM', status: 'upcoming' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="perspective-1000"
    >
      <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
        isDark
          ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10'
          : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b ${
          isDark ? 'border-white/10' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Date Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Today's Schedule
              </h3>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Tuesday, January 14
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">75% Complete</span>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  task.status === 'current'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.status === 'done'
                    ? 'bg-emerald-500 border-emerald-500'
                    : task.status === 'current'
                      ? 'border-indigo-500'
                      : isDark
                        ? 'border-slate-600'
                        : 'border-slate-300'
                }`}>
                  {task.status === 'done' && <CheckCircle2 className="w-3 h-3 text-white" />}
                  {task.status === 'current' && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-indigo-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    task.status === 'done'
                      ? isDark ? 'text-slate-500 line-through' : 'text-slate-400 line-through'
                      : isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    {task.title}
                  </p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <Clock className="w-4 h-4" />
                  {task.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating AI Badge */}
        <motion.div
          className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { isDark } = useTheme();

  const highlights = [
    { icon: Brain, title: 'AI-Powered', description: 'Understands natural language' },
    { icon: Zap, title: 'Instant Planning', description: 'Auto-schedules your day' },
    { icon: Calendar, title: 'Smart Calendar', description: 'Syncs seamlessly' },
  ];

  return (
    <GradientBackground variant="hero">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 20 }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 15 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
                  isDark
                    ? 'bg-white/10 border border-white/20'
                    : 'bg-indigo-50 border border-indigo-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className={`text-sm font-medium ${
                  isDark ? 'text-white' : 'text-indigo-600'
                }`}>
                  AI-Powered Executive Assistant
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Plan Less.{' '}
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Achieve More.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-xl leading-relaxed mb-10 max-w-lg ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Just tell ClarityAI what you need to do — in your own words. 
                Watch as your perfect schedule creates itself, giving you 
                back hours of precious time every day.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <CTAButton to="Input" icon={ArrowRight}>
                  Start Planning Your Day
                </CTAButton>
                <CTAButton to="HowItWorks" variant="outline" icon={Play}>
                  See How It Works
                </CTAButton>
              </motion.div>

              {/* Quick Highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6 mt-12"
              >
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-white/10'
                        : 'bg-indigo-50'
                    }`}>
                      <item.icon className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {item.title}
                      </p>
                      <p className={`text-xs ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Mockup */}
            <div className="lg:pl-8">
              <HeroMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Own Your Day
              </span>
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              ClarityAI combines powerful AI with intuitive design to make 
              daily planning effortless and actually enjoyable.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Natural Language Input"
              description="Just speak or type naturally — 'Remind me to call mom after lunch' becomes a perfectly scheduled task."
              delay={0.1}
            />
            <FeatureCard
              icon={Calendar}
              title="Smart Time-Blocking"
              description="AI automatically finds the perfect time slots for your tasks based on your preferences and habits."
              delay={0.2}
            />
            <FeatureCard
              icon={Zap}
              title="Priority Detection"
              description="Understands what's urgent vs. important and organizes your day for maximum productivity."
              delay={0.3}
            />
          </div>

          <AnimatedSection className="text-center mt-12">
            <CTAButton to="Features" variant="outline">
              Explore All Features
            </CTAButton>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className={`relative rounded-3xl overflow-hidden ${
              isDark
                ? 'bg-gradient-to-br from-indigo-600 to-purple-700'
                : 'bg-gradient-to-br from-indigo-500 to-purple-600'
            }`}>
              <div className="absolute inset-0 bg-grid-white/10" />
              <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Productivity?
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                  Join thousands of professionals who've reclaimed their time 
                  and reduced daily stress with ClarityAI.
                </p>
                <CTAButton to="Dashboard" variant="secondary" icon={ArrowRight}>
                  Get Started for Free
                </CTAButton>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </GradientBackground>
  );
}