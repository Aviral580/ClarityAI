import React from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Mic, Target, Clock, Calendar, FileText,
  Brain, Zap, Bell, Shield, Smartphone, BarChart
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import FeatureCard from '../components/FeatureCard';
import CTAButton from '../components/CTAButton';
import { useTheme } from '../components/ThemeContext';  
export default function Features() {
  const { isDark } = useTheme();
  const mainFeatures = [
    {
      icon: MessageSquare,
      title: 'Natural Language Understanding',
      description: 'Type or speak in your own words. Say "meeting with John tomorrow after lunch" and ClarityAI knows exactly what you mean.',
    },
    {
      icon: Mic,
      title: 'Voice Input Support',
      description: 'Hands busy? Just speak your tasks. Our advanced voice recognition captures every detail accurately.',
    },
    {
      icon: Target,
      title: 'Smart Priority Detection',
      description: 'AI analyzes urgency and importance automatically. Never miss a deadline or overlook critical tasks again.',
    },
    {
      icon: Clock,
      title: 'Auto Time-Block Scheduling',
      description: 'Tasks are automatically placed in optimal time slots based on your energy levels and working patterns.',
    },
    {
      icon: Calendar,
      title: 'Calendar-Based Planning',
      description: 'Visual time-blocked calendar shows your entire day at a glance. Drag, drop, and adjust with ease.',
    },
    {
      icon: FileText,
      title: 'End-of-Day AI Summary',
      description: 'Receive a personalized daily review with accomplishments, suggestions, and insights for tomorrow.',
    },
  ];

  const additionalFeatures = [
    {
      icon: Brain,
      title: 'Learning Algorithm',
      description: 'Gets smarter with every interaction, adapting to your unique preferences and habits.',
    },
    {
      icon: Zap,
      title: 'Instant Rescheduling',
      description: 'Plans change? AI automatically reorganizes your schedule in seconds.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Timely reminders that respect your focus time and break periods.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared. Complete control over your information.',
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform',
      description: 'Access your schedule anywhere — desktop, tablet, or mobile.',
    },
    {
      icon: BarChart,
      title: 'Productivity Insights',
      description: 'Track patterns, identify improvements, and celebrate your wins.',
    },
  ];

  return (
    <GradientBackground variant="primary">
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
                  : 'bg-indigo-50 border border-indigo-100'
              }`}
            >
              <Zap className="w-4 h-4 text-indigo-500" />
              <span className={`text-sm font-medium ${
                isDark ? 'text-white' : 'text-indigo-600'
              }`}>
                Powerful Features
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
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Perfect Days
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-xl leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Discover how ClarityAI's intelligent features work together 
              to streamline your daily planning and boost productivity.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Core Features
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              The essential tools that power your productivity transformation.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Spotlight */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                isDark
                  ? 'bg-emerald-500/20 border border-emerald-500/30'
                  : 'bg-emerald-50 border border-emerald-200'
              }`}>
                <Brain className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-500">
                  AI-Powered
                </span>
              </div>

              <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Natural Language That Actually Works
              </h2>

              <p className={`text-lg mb-6 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Forget rigid forms and dropdown menus. With ClarityAI, you communicate 
                the way you think. Our AI understands context, time references, 
                and even casual phrasing.
              </p>

              <div className="space-y-4">
                {[
                  '"Call mom tomorrow morning"',
                  '"Schedule dentist for next Tuesday afternoon"',
                  '"Remind me to buy groceries after work"',
                ].map((example, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-xl ${
                      isDark
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 text-indigo-500" />
                    <span className={`italic ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {example}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <motion.div
                className={`relative rounded-3xl overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10'
                    : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-xl'
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className={`font-semibold ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>Voice Input</p>
                      <p className={`text-sm ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>Just speak naturally</p>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl mb-4 ${
                    isDark ? 'bg-white/5' : 'bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-rose-600"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      />
                      <div className={`h-8 flex items-center ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        <span className="font-medium">"Schedule team meeting for 3pm..."</span>
                      </div>
                    </div>
                    <div className={`flex gap-1 h-8 items-end ${
                      isDark ? 'text-indigo-400' : 'text-indigo-500'
                    }`}>
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-current rounded-full"
                          animate={{ height: [4, Math.random() * 20 + 8, 4] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.5,
                            delay: i * 0.05,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-emerald-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full"
                    />
                    <span className="text-sm font-medium">Processing...</span>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              And So Much More
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Every detail is designed to make your life easier.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`flex items-start gap-4 p-6 rounded-2xl ${
                    isDark
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-white border border-slate-200 shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${
                    isDark
                      ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
                      : 'bg-gradient-to-br from-indigo-50 to-purple-50'
                  }`}>
                    <feature.icon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className={`font-semibold mb-1 ${
                      isDark ? 'text-white' : 'text-slate-800'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
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
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Experience the Power of AI Planning
            </h2>
            <p className={`text-xl mb-10 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Try all features free and see how much time you can save.
            </p>
            <CTAButton to="/input">
              Try It Now
            </CTAButton>
          </AnimatedSection>
        </div>
      </section>
    </GradientBackground>
  );
}