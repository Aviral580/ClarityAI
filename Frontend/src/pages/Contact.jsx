import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeContext';
import { 
  Mail, MessageSquare, Send, Twitter, 
  Github, Linkedin, MapPin, Phone, Check, Loader2
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', href: '#', color: 'from-blue-400 to-blue-500' },
    { icon: Github, label: 'GitHub', href: '#', color: 'from-slate-700 to-slate-800' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'from-blue-600 to-blue-700' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@ClarityAI.com', color: 'from-indigo-500 to-purple-600' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@ClarityAI.com' },
    { icon: Phone, label: 'Phone', value: '+91 ---------' },
    { icon: MapPin, label: 'Location', value: 'MNNIT ALLAHABAD' },
  ];

  return (
    <GradientBackground variant="primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6"
          >
            <MessageSquare className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Get in Touch
          </h1>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Have questions or feedback? We'd love to hear from you. 
            Our team is here to help.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection delay={0.1}>
            <div className={`p-8 rounded-3xl ${
              isDark
                ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                : 'bg-white border border-slate-200 shadow-xl'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-slate-800'
              }`}>
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-8 rounded-2xl text-center ${
                    isDark
                      ? 'bg-emerald-500/20 border border-emerald-500/30'
                      : 'bg-emerald-50 border border-emerald-200'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}>
                    Message Sent!
                  </h3>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                        isDark
                          ? 'bg-white/10 border-white/20 text-white placeholder-slate-500 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-colors ${
                        isDark
                          ? 'bg-white/10 border-white/20 text-white placeholder-slate-500 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Your Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border outline-none resize-none transition-colors ${
                        isDark
                          ? 'bg-white/10 border-white/20 text-white placeholder-slate-500 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-indigo-500'
                      }`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <div className="space-y-8">
            <AnimatedSection delay={0.2}>
              <div className={`p-8 rounded-3xl ${
                isDark
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                  : 'bg-white border border-slate-200 shadow-xl'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isDark
                          ? 'bg-indigo-500/20'
                          : 'bg-indigo-50'
                      }`}>
                        <item.icon className="w-6 h-6 text-indigo-500" />
                      </div>
                      <div>
                        <p className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {item.label}
                        </p>
                        <p className={`font-medium ${
                          isDark ? 'text-white' : 'text-slate-800'
                        }`}>
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className={`p-8 rounded-3xl ${
                isDark
                  ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/10'
                  : 'bg-white border border-slate-200 shadow-xl'
              }`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Follow Us
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                        isDark
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center`}>
                        <social.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className={`font-medium ${
                        isDark ? 'text-white' : 'text-slate-800'
                      }`}>
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className={`p-8 rounded-3xl ${
                isDark
                  ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30'
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200'
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Response Time
                </h3>
                <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                  We typically respond within 24 hours during business days. 
                  For urgent matters, please mention it in your message.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}