import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import { 
  ChevronLeft, ChevronRight, Plus, Filter,
  Calendar as CalendarIcon, Clock
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CalendarGrid from '../components/CalendarGrid';
import CTAButton from '../components/CTAButton';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('day');
  const { isDark } = useTheme();
  const tasks = [
    { title: 'Morning meditation', time: '6:00', duration: 0.5, priority: 'low', category: 'health', completed: true },
    { title: 'Team standup', time: '9:00', duration: 0.5, priority: 'medium', category: 'work', completed: true },
    { title: 'Design review meeting', time: '10:00', duration: 1.5, priority: 'high', category: 'work', completed: false },
    { title: 'Lunch break', time: '12:00', duration: 1, priority: 'low', category: 'personal', completed: false },
    { title: 'Client presentation', time: '14:00', duration: 2, priority: 'high', category: 'work', completed: false },
    { title: 'Email follow-ups', time: '16:00', duration: 1, priority: 'medium', category: 'work', completed: false },
    { title: 'Gym session', time: '18:00', duration: 1, priority: 'medium', category: 'health', completed: false },
    { title: 'Dinner with family', time: '19:30', duration: 1.5, priority: 'low', category: 'personal', completed: false },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const weekDays = [];
  if (view === 'week') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
  }

  return (
    <GradientBackground variant="primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex items-center gap-4 mb-4 lg:mb-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Calendar
                </h1>
                <p className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {formatDate(currentDate)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {/* View Toggle */}
              <div className={`flex rounded-xl overflow-hidden ${
                isDark
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-slate-100 border border-slate-200'
              }`}>
                {['day', 'week'].map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      view === v
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                        : isDark
                          ? 'text-slate-300 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>

              <CTAButton to="/input" icon={Plus}>
                Add Task
              </CTAButton>
            </div>
          </div>
        </AnimatedSection>

        {/* Navigation */}
        <AnimatedSection delay={0.1}>
          <div className={`flex items-center justify-between p-4 rounded-2xl mb-6 ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white border border-slate-200 shadow-lg'
          }`}>
            <motion.button
              onClick={() => navigateDate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl ${
                isDark
                  ? 'hover:bg-white/10 text-slate-300'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-4">
              <h2 className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                {view === 'day' 
                  ? currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
                  : `Week of ${weekDays[0]?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                }
              </h2>
              <motion.button
                onClick={goToToday}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 text-sm rounded-lg font-medium ${
                  isDark
                    ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                Today
              </motion.button>
            </div>

            <motion.button
              onClick={() => navigateDate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-xl ${
                isDark
                  ? 'hover:bg-white/10 text-slate-300'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Calendar Grid */}
        {view === 'day' ? (
          <AnimatedSection delay={0.2}>
            <CalendarGrid tasks={tasks} startHour={6} endHour={21} />
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={0.2}>
            <div className={`rounded-3xl overflow-hidden ${
              isDark 
                ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10' 
                : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-xl'
            }`}>
              {/* Week Header */}
              <div className={`grid grid-cols-8 border-b ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}>
                <div className="p-4" /> {/* Time column header */}
                {weekDays.map((day, index) => {
                  const isToday = day.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={index}
                      className={`p-4 text-center border-l ${
                        isDark ? 'border-white/10' : 'border-slate-200'
                      }`}
                    >
                      <p className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <p className={`text-lg font-semibold ${
                        isToday
                          ? 'text-indigo-500'
                          : isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {day.getDate()}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Week Grid */}
              <div className="max-h-[600px] overflow-auto">
                {[...Array(16)].map((_, hourIndex) => {
                  const hour = hourIndex + 6;
                  return (
                    <div
                      key={hourIndex}
                      className={`grid grid-cols-8 border-b ${
                        isDark ? 'border-white/5' : 'border-slate-100'
                      }`}
                    >
                      <div className={`p-3 text-right text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                      </div>
                      {weekDays.map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className={`min-h-[60px] border-l ${
                            isDark ? 'border-white/10' : 'border-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Legend */}
        <AnimatedSection delay={0.3}>
          <div className={`mt-6 p-4 rounded-2xl flex flex-wrap gap-6 ${
            isDark
              ? 'bg-white/5 border border-white/10'
              : 'bg-white border border-slate-200 shadow-lg'
          }`}>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-indigo-500 to-purple-600" />
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Work</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-rose-500 to-pink-600" />
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Personal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-500 to-teal-600" />
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Health</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-r from-amber-500 to-orange-600" />
              <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Learning</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </GradientBackground>
  );
}