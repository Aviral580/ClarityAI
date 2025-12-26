import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Send, Sparkles, MessageSquare,
  CheckCircle2, Loader2, Wand2
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';
import { useTheme } from '../components/ThemeContext';

export default function Input() {
  const { isDark } = useTheme();
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setInputText('Schedule a meeting with the design team tomorrow at 2pm to discuss the new project proposal');
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setInputText('');
      }, 3000);
    }, 2000);
  };

  const suggestions = [
    'Schedule team meeting for tomorrow afternoon',
    'Remind me to call the dentist at 3pm',
    'Block 2 hours for deep work tomorrow morning',
    'Add gym session every weekday at 6pm',
  ];

  return (
    <GradientBackground variant="primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            What Would You Like to Do?
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Speak or type naturally — ClarityAI will understand and schedule for you.
          </p>
        </AnimatedSection>

        {/* Voice Input Button */}
        <AnimatedSection delay={0.1} className="mb-8">
          <div className="flex justify-center">
            <motion.button
              onClick={handleVoiceToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/40'
                  : isDark
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-12 h-12 text-white relative z-10" />
                  {/* Pulsing rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-rose-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-rose-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                  />
                </>
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </motion.button>
          </div>
          <p className={`text-center mt-4 text-sm ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {isListening ? 'Listening... Tap to stop' : 'Tap to speak'}
          </p>
        </AnimatedSection>

        {/* Sound Wave Animation */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-center gap-1 mb-8"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
                  animate={{
                    height: [8, Math.random() * 40 + 16, 8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <AnimatedSection delay={0.2}>
          <div className={`relative rounded-3xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20'
              : 'bg-white border border-slate-200 shadow-xl'
          }`}>
            <div className="flex items-start gap-4 p-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark
                  ? 'bg-white/10'
                  : 'bg-indigo-50'
              }`}>
                <MessageSquare className="w-5 h-5 text-indigo-500" />
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your task or schedule here... e.g., 'Schedule a meeting with John tomorrow at 3pm'"
                className={`flex-1 min-h-[120px] resize-none bg-transparent outline-none text-lg ${
                  isDark
                    ? 'text-white placeholder-slate-500'
                    : 'text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>

            <div className={`flex items-center justify-between px-6 py-4 border-t ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {inputText.length} characters
              </p>
              <motion.button
                onClick={handleSubmit}
                disabled={!inputText.trim() || isProcessing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  inputText.trim() && !isProcessing
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                    : isDark
                      ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Schedule with AI
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-6 p-6 rounded-2xl flex items-center gap-4 ${
                isDark
                  ? 'bg-emerald-500/20 border border-emerald-500/30'
                  : 'bg-emerald-50 border border-emerald-200'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`font-semibold ${
                  isDark ? 'text-white' : 'text-slate-800'
                }`}>
                  Task Scheduled Successfully!
                </h3>
                <p className={`text-sm ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  "Design team meeting" added for tomorrow at 2:00 PM
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions */}
        <AnimatedSection delay={0.3} className="mt-12">
          <h3 className={`text-center font-semibold mb-6 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Try saying something like...
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => setInputText(suggestion)}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-4 rounded-xl transition-colors ${
                  isDark
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300'
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                  "{suggestion}"
                </span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* View Calendar Link */}
        <AnimatedSection delay={0.4} className="text-center mt-12">
          <CTAButton to="/calendar" variant="outline">
            View Your Calendar
          </CTAButton>
        </AnimatedSection>
      </div>
    </GradientBackground>
  );
}