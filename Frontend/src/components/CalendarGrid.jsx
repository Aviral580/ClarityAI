import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';
import TaskBlock from './TaskBlock';

export default function CalendarGrid({ tasks = [], startHour = 6, endHour = 22 }) {
  const { isDark } = useTheme();
  
  const hours = [];
  for (let i = startHour; i <= endHour; i++) {
    hours.push(i);
  }

  const formatHour = (hour) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${suffix}`;
  };

  const getTasksForHour = (hour) => {
    return tasks.filter(task => {
      const taskHour = parseInt(task.time.split(':')[0]);
      return taskHour === hour;
    });
  };

  return (
    <div className={`rounded-3xl overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10' 
        : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-xl'
    }`}>
      <div className="p-6 overflow-auto max-h-[600px]">
        {hours.map((hour, index) => {
          const hourTasks = getTasksForHour(hour);
          
          return (
            <motion.div
              key={hour}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`flex border-b ${
                isDark ? 'border-white/5' : 'border-slate-100'
              } min-h-[80px]`}
            >
              <div className={`w-20 flex-shrink-0 py-4 pr-4 text-right ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              } text-sm font-medium`}>
                {formatHour(hour)}
              </div>
              
              <div className={`flex-1 py-2 pl-4 border-l ${
                isDark ? 'border-white/10' : 'border-slate-200'
              }`}>
                <div className="space-y-2">
                  {hourTasks.map((task, taskIndex) => (
                    <TaskBlock
                      key={taskIndex}
                      title={task.title}
                      time={task.time}
                      duration={task.duration}
                      priority={task.priority}
                      completed={task.completed}
                      category={task.category}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}