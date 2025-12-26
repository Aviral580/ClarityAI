import React, { useEffect, useRef } from 'react';
import { useTheme } from '../components/ThemeContext';
import { motion, useInView } from 'framer-motion';
import { 
  MessageSquare, Mic, Brain, HelpCircle, 
  CalendarCheck, Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';


const steps = [
    {
    number: '01',
    icon: MessageSquare,
    title: 'Speak or Type Freely',
    description: 'Tell ClarityAI about your tasks in natural language. No forms, no structure needed — just express what you need to do.',
    example: '"I need to finish the report, call Sarah, and prepare for tomorrow\'s presentation"',
    color: 'indigo',
  },
  {
    number: '02',
    icon: Mic,
    title: 'Voice Converts to Text',
    description: 'Prefer speaking? Our advanced voice recognition accurately captures every word, even with background noise or accents.',
    example: 'Voice input automatically transcribed with 99%+ accuracy',
    color: 'purple',
  },
  {
    number: '03',
    icon: Brain,
    title: 'AI Understands Intent & Priority',
    description: 'Our AI analyzes your input to understand what needs to be done, how urgent it is, and when it should be scheduled.',
    example: 'Detects: 3 tasks, 1 high priority (presentation), flexible timing',
    color: 'rose',
  },
  {
    number: '04',
    icon: HelpCircle,
    title: 'Smart Clarification',
    description: 'If anything is unclear, AI asks one simple question to ensure perfect understanding — no back and forth.',
    example: '"Should I schedule the call with Sarah before or after your lunch break?"',
    color: 'amber',
  },
  {
    number: '05',
    icon: CalendarCheck,
    title: 'Tasks Auto-Scheduled',
    description: 'Based on your preferences, available time, and task requirements, everything is placed in optimal time slots.',
    example: 'Report: 9-11 AM, Call Sarah: 11:30 AM, Presentation prep: 2-4 PM',
    color: 'emerald',
  },
  {
    number: '06',
    icon: Sparkles,
    title: 'Calendar Updates Instantly',
    description: 'Your calendar reflects the new schedule immediately. Color-coded blocks show priorities at a glance.',
    example: 'Live sync with your calendar view — no refresh needed',
    color: 'cyan',
  },
  {
    number: '07',
    icon: CheckCircle2,
    title: 'End-of-Day AI Summary',
    description: 'Receive a personalized summary of what you accomplished, what moved, and intelligent suggestions for tomorrow.',
    example: '"Great day! 4/5 tasks completed. Moved presentation prep to tomorrow morning."',
    color: 'teal',
  },
];

function TimelineStep({ step, index }) {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const colorClasses = {
    indigo: 'from-indigo-500 to-indigo-600',
    purple: 'from-purple-500 to-purple-600',
    rose: 'from-rose-500 to-rose-600',
    amber: 'from-amber-500 to-amber-600',
    emerald: 'from-emerald-500 to-emerald-600',
    cyan: 'from-cyan-500 to-cyan-600',
    teal: 'from-teal-500 to-teal-600',
  };

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full origin-top ${
            isDark
              ? 'bg-gradient-to-b from-white/20 to-white/5'
              : 'bg-gradient-to-b from-slate-300 to-slate-100'
          }`}
        />
      </div>

      {/* Step Content */}
      <div className={`flex flex-col md:flex-row items-center gap-8 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}>
        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 w-full"
        >
          <div className={`p-8 rounded-3xl ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
              : 'bg-white border border-slate-200 shadow-xl'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[step.color]} flex items-center justify-center`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>
              <span className={`text-sm font-bold ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}>
                STEP {step.number}
              </span>
            </div>

            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-slate-800'
            }`}>
              {step.title}
            </h3>

            <p className={`mb-4 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {step.description}
            </p>

            <div className={`p-4 rounded-xl ${
              isDark
                ? 'bg-white/5 border border-white/10'
                : 'bg-slate-50 border border-slate-100'
            }`}>
              <p className={`text-sm italic ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {step.example}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Center Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4, type: 'spring' }}
          className="relative z-10 flex-shrink-0"
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${colorClasses[step.color]} flex items-center justify-center shadow-lg`}>
            <span className="text-xl font-bold text-white">{step.number}</span>
          </div>
        </motion.div>

        {/* Spacer for alignment */}
        <div className="flex-1 hidden md:block" />
      </div>
    </div>
  );
}

export default function HowItWorks() {
const { isDark } = useTheme();
  return (
    <GradientBackground variant="teal">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
                isDark
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-teal-50 border border-teal-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span className={`text-sm font-medium ${
                isDark ? 'text-white' : 'text-teal-600'
              }`}>
                Simple Process
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-4xl sm:text-6xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              From Thought to{' '}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                Scheduled
              </span>{' '}
              in Seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              ClarityAI makes planning effortless. Here's exactly how your 
              words transform into a perfectly organized day.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <TimelineStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className={`p-12 rounded-3xl text-center ${
              isDark
                ? 'bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/30'
                : 'bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200'
            }`}>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                That's It. Really.
              </h2>

              <p className={`text-xl max-w-2xl mx-auto mb-8 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                No complicated setup. No learning curve. Just natural 
                communication that turns into productive, organized days.
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {[
                  { label: 'Setup Time', value: 'Zero' },
                  { label: 'Learning Curve', value: 'None' },
                  { label: 'Time Saved', value: '2+ Hours/Day' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={`px-6 py-4 rounded-2xl ${
                      isDark
                        ? 'bg-white/10'
                        : 'bg-white shadow-lg'
                    }`}
                  >
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-800'
                    }`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <CTAButton to="/input" icon={ArrowRight}>
                Try It Yourself
              </CTAButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </GradientBackground>
  );
}