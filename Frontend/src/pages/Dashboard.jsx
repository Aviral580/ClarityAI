import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../components/ThemeContext";
import {
  Plus,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Sun,
  Coffee,
} from "lucide-react";
import GradientBackground from "../components/GradientBackground";
import AnimatedSection from "../components/AnimatedSection";
import CTAButton from "../components/CTAButton";

export default function Dashboard() {
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Team standup meeting",
      time: "9:00 AM",
      duration: "30 min",
      completed: true,
      priority: "medium",
      category: "work",
    },
    {
      id: 2,
      title: "Review quarterly report",
      time: "10:00 AM",
      duration: "2 hours",
      completed: true,
      priority: "high",
      category: "work",
    },
    {
      id: 3,
      title: "Lunch break",
      time: "12:00 PM",
      duration: "1 hour",
      completed: true,
      priority: "low",
      category: "personal",
    },
    {
      id: 4,
      title: "Client presentation",
      time: "2:00 PM",
      duration: "1 hour",
      completed: false,
      priority: "high",
      category: "work",
    },
    {
      id: 5,
      title: "Email follow-ups",
      time: "3:30 PM",
      duration: "45 min",
      completed: false,
      priority: "medium",
      category: "work",
    },
    {
      id: 6,
      title: "Gym session",
      time: "5:30 PM",
      duration: "1 hour",
      completed: false,
      priority: "medium",
      category: "health",
    },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const priorityColors = {
    high: "from-rose-500 to-pink-600",
    medium: "from-indigo-500 to-purple-600",
    low: "from-emerald-500 to-teal-600",
  };

  const categoryIcons = {
    work: "💼",
    personal: "🏠",
    health: "🏃",
  };

  return (
    <GradientBackground variant="subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Header */}
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  {new Date().getHours() < 18 ? (
                    <Sun className="w-8 h-8 text-amber-500" />
                  ) : (
                    <Coffee className="w-8 h-8 text-indigo-500" />
                  )}
                </motion.div>
                <h1
                  className={`text-3xl sm:text-4xl font-bold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {getGreeting()}!
                </h1>
              </div>
              <p
                className={`text-lg ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {today}
              </p>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-0">
              <CTAButton to="/input" icon={Plus}>
                Add Task
              </CTAButton>
              <CTAButton to="/calendar" variant="outline" icon={Calendar}>
                View Calendar
              </CTAButton>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Tasks Today",
              value: tasks.length,
              icon: Calendar,
              color: "indigo",
            },
            {
              label: "Completed",
              value: completedCount,
              icon: CheckCircle2,
              color: "emerald",
            },
            {
              label: "In Progress",
              value: tasks.length - completedCount,
              icon: Clock,
              color: "amber",
            },
            {
              label: "Productivity",
              value: `${progressPercent}%`,
              icon: TrendingUp,
              color: "purple",
            },
          ].map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl ${
                  isDark
                    ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                    : "bg-white border border-slate-200 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? `bg-${stat.color}-500/20` : `bg-${stat.color}-50`
                    }`}
                  >
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
                <p
                  className={`text-3xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {stat.label}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Progress Bar */}
        <AnimatedSection delay={0.2}>
          <div
            className={`p-6 rounded-2xl mb-8 ${
              isDark
                ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                : "bg-white border border-slate-200 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`font-semibold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                Daily Progress
              </h3>
              <span
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {completedCount} of {tasks.length} tasks
              </span>
            </div>
            <div
              className={`h-4 rounded-full overflow-hidden ${
                isDark ? "bg-white/10" : "bg-slate-100"
              }`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Tasks Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task List */}
          <div className="lg:col-span-2">
            <AnimatedSection delay={0.3}>
              <div
                className={`rounded-2xl overflow-hidden ${
                  isDark
                    ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                    : "bg-white border border-slate-200 shadow-lg"
                }`}
              >
                <div
                  className={`px-6 py-4 border-b ${
                    isDark ? "border-white/10" : "border-slate-100"
                  }`}
                >
                  <h3
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    Today's Tasks
                  </h3>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-white/10">
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className={`flex items-center gap-4 p-4 transition-colors ${
                        isDark ? "hover:bg-white/5" : "hover:bg-slate-50"
                      }`}
                    >
                      <motion.button
                        onClick={() => toggleTask(task.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.completed
                            ? "bg-emerald-500 border-emerald-500"
                            : isDark
                            ? "border-slate-600 hover:border-emerald-500"
                            : "border-slate-300 hover:border-emerald-500"
                        }`}
                      >
                        {task.completed && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </motion.button>

                      <div
                        className={`w-1 h-10 rounded-full bg-gradient-to-b ${
                          priorityColors[task.priority]
                        }`}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span>{categoryIcons[task.category]}</span>
                          <p
                            className={`font-medium truncate ${
                              task.completed
                                ? isDark
                                  ? "text-slate-500 line-through"
                                  : "text-slate-400 line-through"
                                : isDark
                                ? "text-white"
                                : "text-slate-800"
                            }`}
                          >
                            {task.title}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-sm ${
                            isDark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{task.time}</span>
                          <span>•</span>
                          <span>{task.duration}</span>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          task.priority === "high"
                            ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400"
                            : task.priority === "medium"
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <AnimatedSection delay={0.4}>
              <div
                className={`p-6 rounded-2xl ${
                  isDark
                    ? "bg-gradient-to-br from-white/10 to-white/5 border border-white/10"
                    : "bg-white border border-slate-200 shadow-lg"
                }`}
              >
                <h3
                  className={`font-semibold mb-4 ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}
                >
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link to="/input">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isDark ? "hover:bg-white/10" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className={isDark ? "text-slate-300" : "text-slate-600"}
                      >
                        Add new task
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 ml-auto ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      />
                    </motion.div>
                  </Link>
                  <Link to="/calendar">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isDark ? "hover:bg-white/10" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className={isDark ? "text-slate-300" : "text-slate-600"}
                      >
                        View calendar
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 ml-auto ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      />
                    </motion.div>
                  </Link>
                  <Link to="/summary">
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                        isDark ? "hover:bg-white/10" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className={isDark ? "text-slate-300" : "text-slate-600"}
                      >
                        Daily summary
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 ml-auto ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      />
                    </motion.div>
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* AI Tip */}
            <AnimatedSection delay={0.5}>
              <div
                className={`p-6 rounded-2xl ${
                  isDark
                    ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30"
                    : "bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h3
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    AI Insight
                  </h3>
                </div>
                <p
                  className={`text-sm ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Based on your patterns, you're most productive between 9-11
                  AM. Consider scheduling important tasks during this window.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
