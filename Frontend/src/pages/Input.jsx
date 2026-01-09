import React, { useState, useEffect } from 'react';
import "regenerator-runtime/runtime"; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, MicOff, Sparkles, MessageSquare,
  CheckCircle2, Loader2, Wand2, AlertCircle
} from 'lucide-react';
import GradientBackground from '../components/GradientBackground';
import AnimatedSection from '../components/AnimatedSection';
import CTAButton from '../components/CTAButton';
import { useTheme } from '../components/ThemeContext';

export default function Input() {
  const { isDark } = useTheme();
  
  // 1. Setup Speech Hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition();

  // 2. Local State
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 3. Sync Transcript to Input
  useEffect(() => {
    if (transcript) {
        setInputText(transcript);
    }
  }, [transcript]);

  // 4. Start/Stop Handlers
  const handleVoiceToggle = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }
  };

  // 5. Handle Submit
  const handleSubmit = async () => {
    const finalContent = inputText || transcript;
    if (!finalContent.trim()) return;
    
    SpeechRecognition.stopListening();
    setIsProcessing(true);
    
    // Simulate API Processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setInputText('');
        resetTranscript(); 
      }, 3000);
    }, 2000);
  };

  // 6. Define Suggestions List (moved up here!)
  const suggestions = [
    'Schedule team meeting for tomorrow afternoon',
    'Remind me to call the dentist at 3pm',
    'Block 2 hours for deep work tomorrow morning',
    'Add gym session every weekday at 6pm',
  ];

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-center p-10 text-white">Browser not supported. Please use Google Chrome.</div>;
  }

  return (
    <GradientBackground variant="primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
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
            Speak naturally — ClarityAI will handle the rest.
          </p>
        </AnimatedSection>

        {/* Microphone Error Alert */}
        <AnimatePresence>
            {!isMicrophoneAvailable && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 max-w-md mx-auto"
                >
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-sm font-medium">Microphone access denied. Please allow permission.</p>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Voice Button */}
        <AnimatedSection delay={0.1} className="mb-4">
          <div className="flex flex-col items-center justify-center">
            <motion.button
              onClick={handleVoiceToggle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all ${
                listening
                  ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/40'
                  : isDark
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
              }`}
            >
              {listening ? (
                <>
                  <MicOff className="w-12 h-12 text-white relative z-10" />
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
            <p className={`text-center mt-4 text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
                {listening ? 'Listening... Speak now!' : 'Tap to speak'}
            </p>
          </div>
        </AnimatedSection>

        {/* Waves Animation */}
        <div className="h-12 w-full flex items-center justify-center mb-4">
             <AnimatePresence mode="wait">
                {listening && (
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-center gap-1"
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
        </div>

        {/* Text Input */}
        <AnimatedSection delay={0.2}>
          <div className={`relative rounded-3xl overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20'
              : 'bg-white border border-slate-200 shadow-xl'
          }`}>
            <div className="flex items-start gap-4 p-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isDark ? 'bg-white/10' : 'bg-indigo-50'
              }`}>
                <MessageSquare className="w-5 h-5 text-indigo-500" />
              </div>
              
              <textarea
                value={listening ? transcript : inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or speak naturally..."
                className={`flex-1 min-h-[120px] resize-none bg-transparent outline-none text-lg ${
                  isDark ? 'text-white placeholder-slate-500' : 'text-slate-800 placeholder-slate-400'
                }`}
              />
            </div>

            <div className={`flex items-center justify-between px-6 py-4 border-t ${
              isDark ? 'border-white/10' : 'border-slate-100'
            }`}>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {(inputText || transcript).length} characters
              </p>
              <motion.button
                onClick={handleSubmit}
                disabled={(!inputText && !transcript) || isProcessing}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  (inputText || transcript) && !isProcessing
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : isDark
                      ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 animate-spin" />Processing...</>
                ) : (
                  <><Wand2 className="w-5 h-5" />Schedule with AI</>
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
                  Check your calendar to see the changes.
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
                onClick={() => {
                    setInputText(suggestion);
                    resetTranscript();
                }}
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