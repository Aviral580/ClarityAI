import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, Clock, Coffee, Bell,
  Sun, Moon, Save, Check
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import { useTheme } from '../components/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const { isDark } = useTheme();
  const [settings, setSettings] = useState({
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    breakDuration: '15',
    lunchDuration: '60',
    notifications: {
      taskReminders: true,
      dailySummary: true,
      weeklyReport: true,
      soundEnabled: false,
    },
    preferences: {
      autoSchedule: true,
      smartSuggestions: true,
      focusMode: false,
    }
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const SettingCard = ({ title, description, children }) => (
    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold mb-1 text-slate-800">
            {title}
          </h3>
          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <motion.button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-7 rounded-full transition-colors ${
        checked
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
          : 'bg-slate-200'
      }`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow-md absolute top-1"
        animate={{ left: checked ? 26 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );

  return (
    <GradientBackground variant="subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Settings
              </h1>
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Customize your ClarityAI experience
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-8">
          {/* Appearance Section */}
          <AnimatedSection delay={0.1}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              <Sun className="w-5 h-5 text-amber-500" />
              Appearance
            </h2>
            <div className={`p-6 rounded-2xl ${
              isDark
                ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                : 'bg-white border border-slate-200 shadow-lg'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`font-semibold mb-1 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Dark Mode
                  </h3>
                  <p className={`text-sm ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Switch between light and dark themes
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </AnimatedSection>

          {/* Working Hours Section */}
          <AnimatedSection delay={0.2}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              <Clock className="w-5 h-5 text-indigo-500" />
              Working Hours
            </h2>
            <div className={`p-6 rounded-2xl ${
              isDark
                ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                : 'bg-white border border-slate-200 shadow-lg'
            }`}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={settings.workingHoursStart}
                    onChange={(e) => setSettings({ ...settings, workingHoursStart: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                      isDark
                        ? 'bg-white/10 border-white/20 text-white focus:border-indigo-500'
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    End Time
                  </label>
                  <input
                    type="time"
                    value={settings.workingHoursEnd}
                    onChange={(e) => setSettings({ ...settings, workingHoursEnd: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                      isDark
                        ? 'bg-white/10 border-white/20 text-white focus:border-indigo-500'
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Break Duration Section */}
          <AnimatedSection delay={0.3}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              <Coffee className="w-5 h-5 text-amber-500" />
              Break Settings
            </h2>
            <div className={`p-6 rounded-2xl space-y-6 ${
              isDark
                ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                : 'bg-white border border-slate-200 shadow-lg'
            }`}>
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Short Break Duration
                </label>
                <div className="flex gap-3">
                  {['5', '10', '15', '20'].map((duration) => (
                    <motion.button
                      key={duration}
                      onClick={() => setSettings({ ...settings, breakDuration: duration })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                        settings.breakDuration === duration
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : isDark
                            ? 'bg-white/10 text-slate-300 hover:bg-white/20'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {duration} min
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Lunch Break Duration
                </label>
                <div className="flex gap-3">
                  {['30', '45', '60', '90'].map((duration) => (
                    <motion.button
                      key={duration}
                      onClick={() => setSettings({ ...settings, lunchDuration: duration })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                        settings.lunchDuration === duration
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : isDark
                            ? 'bg-white/10 text-slate-300 hover:bg-white/20'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {duration} min
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Notifications Section */}
          <AnimatedSection delay={0.4}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              <Bell className="w-5 h-5 text-rose-500" />
              Notifications
            </h2>
            <div className="space-y-4">
              <SettingCard
                title="Task Reminders"
                description="Get notified before scheduled tasks"
              >
                <Toggle
                  checked={settings.notifications.taskReminders}
                  onChange={(v) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, taskReminders: v }
                  })}
                />
              </SettingCard>
              <SettingCard
                title="Daily Summary"
                description="Receive an end-of-day summary email"
              >
                <Toggle
                  checked={settings.notifications.dailySummary}
                  onChange={(v) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, dailySummary: v }
                  })}
                />
              </SettingCard>
              <SettingCard
                title="Weekly Report"
                description="Get productivity insights every week"
              >
                <Toggle
                  checked={settings.notifications.weeklyReport}
                  onChange={(v) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyReport: v }
                  })}
                />
              </SettingCard>
              <SettingCard
                title="Sound Effects"
                description="Play sounds for notifications"
              >
                <Toggle
                  checked={settings.notifications.soundEnabled}
                  onChange={(v) => setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, soundEnabled: v }
                  })}
                />
              </SettingCard>
            </div>
          </AnimatedSection>

          {/* AI Preferences Section */}
          <AnimatedSection delay={0.5}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              <Moon className="w-5 h-5 text-purple-500" />
              AI Preferences
            </h2>
            <div className="space-y-4">
              <SettingCard
                title="Auto-Schedule Tasks"
                description="Let AI automatically find the best time for tasks"
              >
                <Toggle
                  checked={settings.preferences.autoSchedule}
                  onChange={(v) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, autoSchedule: v }
                  })}
                />
              </SettingCard>
              <SettingCard
                title="Smart Suggestions"
                description="Get AI-powered productivity tips"
              >
                <Toggle
                  checked={settings.preferences.smartSuggestions}
                  onChange={(v) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, smartSuggestions: v }
                  })}
                />
              </SettingCard>
              <SettingCard
                title="Focus Mode"
                description="Minimize distractions during deep work"
              >
                <Toggle
                  checked={settings.preferences.focusMode}
                  onChange={(v) => setSettings({
                    ...settings,
                    preferences: { ...settings.preferences, focusMode: v }
                  })}
                />
              </SettingCard>
            </div>
          </AnimatedSection>

          {/* Save Button */}
          <AnimatedSection delay={0.6}>
            <div className="flex justify-end pt-4">
              <motion.button
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                  saved
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </GradientBackground>
  );
}