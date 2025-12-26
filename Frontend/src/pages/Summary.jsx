import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, XCircle, Lightbulb, TrendingUp,
  Calendar, Clock, Sparkles, ArrowRight, Sun
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';
import { useTheme } from '../components/ThemeContext';

export default function Summary() {
  const { isDark } = useTheme();
  const completedTasks = [
    { title: 'Team standup meeting', time: '9:00 AM', duration: '30 min' },
    { title: 'Review quarterly report', time: '10:00 AM', duration: '2 hours' },
    { title: 'Lunch with marketing team', time: '12:00 PM', duration: '1 hour' },
    { title: 'Client call - Project kickoff', time: '2:00 PM', duration: '1 hour' },
    { title: 'Email follow-ups', time: '4:00 PM', duration: '45 min' },
  ];

  const missedTasks = [
    { title: 'Gym session', originalTime: '6:00 PM', reason: 'Meeting overrun' },
    { title: 'Read industry articles', originalTime: '7:30 PM', reason: 'Moved to tomorrow' },
  ];

  const suggestions = [
    {
      icon: Clock,
      title: 'Schedule Buffer Time',
      description: 'Your meetings often run over. Consider adding 15-minute buffers between calls.',
    },
    {
      icon: TrendingUp,
      title: 'Peak Productivity Hours',
      description: 'You completed most tasks between 9 AM - 12 PM. Schedule important work during this window.',
    },
    {
      icon: Calendar,
      title: 'Balance Your Day',
      description: 'Consider blocking time for exercise in the morning when you\'re less likely to skip it.',
    },
  ];

  const tomorrowHints = [
    '3 meetings scheduled (9 AM, 11 AM, 3 PM)',
    'Deep work block available 1-3 PM',
    'Remember: Weekly report due by 5 PM',
    'Gym session rescheduled for 6:30 PM',
  ];

  const stats = [
    { label: 'Tasks Completed', value: '5/7', percent: 71, color: 'emerald' },
    { label: 'Focus Time', value: '4.5h', percent: 75, color: 'indigo' },
    { label: 'Meeting Time', value: '3.5h', percent: 44, color: 'amber' },
  ];

  return (
    <GradientBackground variant="accent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Your Day in Review
            </h1>
            <p className={`text-lg ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className={`p-6 rounded-2xl ${
                isDark
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                  : 'bg-white border border-slate-200 shadow-lg'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {stat.label}
                  </span>
                  <span className={`text-2xl font-bold ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    {stat.value}
                  </span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-slate-100'
                }`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percent}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-full rounded-full ${
                      stat.color === 'emerald'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                        : stat.color === 'indigo'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500'
                    }`}
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Completed Tasks */}
          <AnimatedSection delay={0.2}>
            <div className={`h-full rounded-2xl overflow-hidden ${
              isDark
                ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                : 'bg-white border border-slate-200 shadow-lg'
            }`}>
              <div className={`px-6 py-4 border-b flex items-center gap-3 ${
                isDark ? 'border-white/10' : 'border-slate-100'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Completed Tasks
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {completedTasks.length} tasks done
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-[300px] overflow-auto">
                {completedTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      isDark
                        ? 'bg-emerald-500/10'
                        : 'bg-emerald-50'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </p>
                      <p className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {task.time} • {task.duration}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Missed Tasks */}
          <AnimatedSection delay={0.3}>
            <div className={`h-full rounded-2xl overflow-hidden ${
              isDark
                ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                : 'bg-white border border-slate-200 shadow-lg'
            }`}>
              <div className={`px-6 py-4 border-b flex items-center gap-3 ${
                isDark ? 'border-white/10' : 'border-slate-100'
              }`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Missed Tasks
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {missedTasks.length} tasks rescheduled
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {missedTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      isDark
                        ? 'bg-rose-500/10'
                        : 'bg-rose-50'
                    }`}
                  >
                    <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </p>
                      <p className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Originally: {task.originalTime} • {task.reason}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* AI Suggestions */}
        <AnimatedSection delay={0.4} className="mt-8">
          <div className={`rounded-2xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30'
              : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center gap-3 ${
              isDark ? 'border-indigo-500/30' : 'border-indigo-200'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className={`font-semibold ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                AI Suggestions for Improvement
              </h3>
            </div>
            <div className="p-6 grid md:grid-cols-3 gap-6">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-xl ${
                    isDark
                      ? 'bg-white/5'
                      : 'bg-white shadow'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${
                    isDark
                      ? 'bg-indigo-500/20'
                      : 'bg-indigo-50'
                  }`}>
                    <suggestion.icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h4 className={`font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    {suggestion.title}
                  </h4>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {suggestion.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Tomorrow Preview */}
        <AnimatedSection delay={0.5} className="mt-8">
          <div className={`rounded-2xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
              : 'bg-white border border-slate-200 shadow-lg'
          }`}>
            <div className={`px-6 py-4 border-b flex items-center gap-3 ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <h3 className={`font-semibold ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                Tomorrow at a Glance
              </h3>
            </div>
            <div className="p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {tomorrowHints.map((hint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <ArrowRight className={`w-4 h-4 flex-shrink-0 ${
                      isDark ? 'text-amber-400' : 'text-amber-500'
                    }`} />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                      {hint}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Action Button */}
        <AnimatedSection delay={0.6} className="text-center mt-12">
          <CTAButton to="/dashboard">
            View Tomorrow's Schedule
          </CTAButton>
        </AnimatedSection>
      </div>
    </GradientBackground>
  );
}