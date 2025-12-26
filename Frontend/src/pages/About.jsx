import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Lightbulb, Clock, Coffee, Brain, Sparkles } from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';
import { useTheme } from '../components/ThemeContext';


export default function About() {
  const { isDark } = useTheme();
  const problems = [
    {
      icon: Clock,
      title: 'Time Lost to Planning',
      description: 'Hours spent organizing calendars, prioritizing tasks, and rescheduling when things change.',
    },
    {
      icon: Coffee,
      title: 'Decision Fatigue',
      description: 'Constant mental juggling of what to do next drains your energy before real work begins.',
    },
    {
      icon: Target,
      title: 'Missed Priorities',
      description: 'Important tasks slip through the cracks while you\'re buried in busy work.',
    },
  ];

  const solutions = [
    {
      icon: Brain,
      title: 'AI That Understands You',
      description: 'Speak naturally about your day. ClarityAI comprehends context, priorities, and preferences just like a real assistant would.',
    },
    {
      icon: Sparkles,
      title: 'Automatic Organization',
      description: 'Tasks are intelligently scheduled, time-blocked, and prioritized — no manual sorting required.',
    },
    {
      icon: Heart,
      title: 'Stress-Free Days',
      description: 'Wake up to a perfectly planned day. Focus on doing, not organizing.',
    },
  ];

  const values = [
    { icon: Users, title: 'Human-Centered', description: 'Technology that adapts to you, not the other way around.' },
    { icon: Lightbulb, title: 'Simplicity First', description: 'Powerful features wrapped in an intuitive experience.' },
    { icon: Heart, title: 'Wellbeing Focused', description: 'Productivity that respects your time for rest and life.' },
  ];

  return (
    <GradientBackground variant="accent">
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-rose-50 border border-rose-100"
            >
              <Heart className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600">
                Our Story
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold mb-6 text-slate-400"
            >
              We Believe Your Time Is{' '}
              <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Precious
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl leading-relaxed text-slate-600"
            >
              ClarityAI was born from a simple observation: brilliant people 
              spend too much energy managing their schedules instead of 
              doing what they do best.
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              The Daily Planning Struggle
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-slate-600">
              Sound familiar? These are the challenges that inspired us to build something better.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-rose-100/50 border border-rose-200">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mb-6">
                    <problem.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">
                    {problem.title}
                  </h3>
                  <p className="text-slate-600">
                    {problem.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              How AI Removes the Stress
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-slate-600">
              ClarityAI handles the mental load of planning, so you can focus on what truly matters.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6">
                    <solution.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">
                    {solution.title}
                  </h3>
                  <p className="text-slate-600">
                    {solution.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              What We Stand For
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-slate-600">
              Our principles guide every decision we make.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full p-8 rounded-3xl text-center bg-white border border-slate-200 shadow-lg"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800">
                    {value.title}
                  </h3>
                  <p className="text-slate-600">
                    {value.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-900">
              Ready to Take Back Your Time?
            </h2>
            <p className="text-xl mb-10 text-slate-600">
              Experience the difference an AI assistant makes in your daily life.
            </p>
            <CTAButton to="/dashboard">
              Start Your Journey
            </CTAButton>
          </AnimatedSection>
        </div>
      </section>
    </GradientBackground>
  );
}