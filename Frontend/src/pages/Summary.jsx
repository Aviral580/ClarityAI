import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2, XCircle, Lightbulb, TrendingUp,
  Calendar, Clock, Sparkles, ArrowRight, Sun
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';
import { useTheme } from '../components/ThemeContext';
import {taskService} from '../services/taskService';
import moment from 'moment';

export default function Summary() {
  const { isDark } = useTheme();

  const [completedTasks, setCompletedTasks] = useState([]);
  const [missedTasks, setMissedTasks] = useState([]);
  const [stats, setStats] = useState([]);

  /* ---------------- YESTERDAY RANGE ---------------- */
  const start = moment().subtract(1, 'day').startOf('day').toDate();
  const end = moment().subtract(1, 'day').endOf('day').toDate();

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    const fetchSummary = async () => {
      const response = await taskService.fetchTasks(start, end);
      const tasks = response.data || response;

      const completed = [];
      const missed = [];

      let focusMinutes = 0;
      let meetingMinutes = 0;

      tasks.forEach(task => {
        const startTime = new Date(task.start);
        const endTime = new Date(task.end);
        const duration = (endTime - startTime) / 60000;

        if (task.status === 'Completed') {
          completed.push({
            title: task.title,
            time: moment(startTime).format('h:mm A'),
            duration: `${Math.round(duration)} min`
          });

          if (task.category === 'meeting') meetingMinutes += duration;
          else focusMinutes += duration;
        } else if (endTime < new Date()) {
          missed.push({
            title: task.title,
            originalTime: moment(startTime).format('h:mm A'),
            reason: 'Not completed'
          });
        }
      });

      setCompletedTasks(completed);
      setMissedTasks(missed);

      setStats([
        {
          label: 'Tasks Completed',
          value: `${completed.length}/${tasks.length}`,
          percent: tasks.length
            ? Math.round((completed.length / tasks.length) * 100)
            : 0,
          color: 'emerald'
        },
        {
          label: 'Focus Time',
          value: `${(focusMinutes / 60).toFixed(1)}h`,
          percent: Math.min(100, (focusMinutes / 480) * 100),
          color: 'indigo'
        },
        {
          label: 'Meeting Time',
          value: `${(meetingMinutes / 60).toFixed(1)}h`,
          percent: Math.min(100, (meetingMinutes / 480) * 100),
          color: 'amber'
        }
      ]);
    };

    fetchSummary();
  }, []);


  const [tomorrowHints, setTomorrowHints] = useState([]);

useEffect(() => {
  const fetchTomorrow = async () => {
    const start = moment().add(1, 'day').startOf('day').toDate();
    const end = moment().add(1, 'day').endOf('day').toDate();

    const response = await taskService.fetchTasks(start, end);
    const tasks = response.data || response;

    if (!tasks.length) {
      setTomorrowHints(['No tasks scheduled for tomorrow 🎉']);
      return;
    }

    const hints = [];

    const meetings = tasks.filter(t => t.category === 'meeting');
    if (meetings.length) {
      hints.push(`${meetings.length} meeting(s) scheduled`);
    }

    const morningTasks = tasks.filter(t =>
      new Date(t.start).getHours() < 12
    );
    if (morningTasks.length) {
      hints.push(`${morningTasks.length} task(s) before noon`);
    }

    const totalDuration = tasks.reduce((acc, t) => {
      return acc + (new Date(t.end) - new Date(t.start)) / 60000;
    }, 0);

    hints.push(`~${Math.round(totalDuration / 60)}h planned`);

    setTomorrowHints(hints);
  };

  fetchTomorrow();
}, []);


  /* ---------------- UI (UNCHANGED) ---------------- */
  return (
    <GradientBackground variant="accent">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Your Day in Review
            </h1>

            <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
              {moment(start).format('dddd, MMMM D')}
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-white/10' : 'bg-white shadow'}`}>
                <div className="flex justify-between mb-3">
                  <span className="text-sm">{stat.label}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percent}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded"
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Completed + Missed */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Completed */}
          <AnimatedSection>
            <div className={`rounded-2xl ${isDark ? 'bg-white/10' : 'bg-white shadow'}`}>
              <div className="p-6 border-b flex gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <h3>Completed Tasks</h3>
              </div>
              <div className="p-4 space-y-3">
                {completedTasks.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="text-emerald-500" />
                    <div>
                      <p>{t.title}</p>
                      <p className="text-sm opacity-70">{t.time} • {t.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Missed */}
          <AnimatedSection>
            <div className={`rounded-2xl ${isDark ? 'bg-white/10' : 'bg-white shadow'}`}>
              <div className="p-6 border-b flex gap-3">
                <XCircle className="text-rose-500" />
                <h3>Missed Tasks</h3>
              </div>
              <div className="p-4 space-y-3">
                {missedTasks.map((t, i) => (
                  <div key={i} className="flex gap-3">
                    <XCircle className="text-rose-500" />
                    <div>
                      <p>{t.title}</p>
                      <p className="text-sm opacity-70">
                        Originally {t.originalTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

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
            <ArrowRight className={`w-4 h-4 ${
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


      </div>
    </GradientBackground>
  );
}
