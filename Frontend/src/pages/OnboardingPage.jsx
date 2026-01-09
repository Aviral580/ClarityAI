import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Clock, Sun, Zap, Calendar, ArrowRight, CheckCircle2,
    Briefcase, Coffee, Battery
} from 'lucide-react';
import { useTheme } from '../components/ThemeContext';
 import { saveOnboardingData } from '../services/authService'; // Uncomment when ready

export default function OnboardingPage() {
    const { isDark } = useTheme();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        workStart: "09:00",
        workEnd: "17:00",
        energyPeak: "morning",
        avgTaskDuration: 45,
        focusDays: ["Monday", "Wednesday"]
    });

    // Steps Configuration
    const steps = [
        {
            id: 'hours',
            title: "When do you work best?",
            subtitle: "Set your typical working hours so we don't schedule tasks when you're resting.",
            icon: <Clock className="w-6 h-6 text-indigo-500" />,
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Office Clock/Desk
        },
        {
            id: 'energy',
            title: "When is your energy peak?",
            subtitle: "We'll schedule your hardest tasks during your high-energy windows.",
            icon: <Sun className="w-6 h-6 text-amber-500" />,
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Sunrise/Yoga
        },
        {
            id: 'duration',
            title: "Preferred focus duration?",
            subtitle: "How long do you like to work before taking a short break?",
            icon: <Coffee className="w-6 h-6 text-rose-500" />,
            image: "https://images.unsplash.com/photo-1501139083538-0139583c61df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Coffee/Focus
        },
        {
            id: 'days',
            title: "Deep Work Days",
            subtitle: "Select days where you want to minimize meetings and focus on big projects.",
            icon: <Calendar className="w-6 h-6 text-emerald-500" />,
            image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Calendar/Planning
        }
    ];

    const handleNext = async () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            // Final Step - Submit Data
            setLoading(true);
            try {
                const payload = {
                    onboardingData: {
                        workHours: { start: formData.workStart, end: formData.workEnd },
                        energyPeak: formData.energyPeak,
                        avgTaskDuration: parseInt(formData.avgTaskDuration),
                        focusDays: formData.focusDays
                    }
                };

                console.log("Submitting Onboarding Data:", payload);

                 await saveOnboardingData(payload); // API CALL

                // Simulate API delay
                setTimeout(() => {
                    navigate('/calendar'); // Redirect to main app
                }, 1500);

            } catch (error) {
                console.error("Onboarding failed", error);
                setLoading(false);
            }
        }
    };

    const toggleDay = (day) => {
        setFormData(prev => {
            const days = prev.focusDays.includes(day)
                ? prev.focusDays.filter(d => d !== day)
                : [...prev.focusDays, day];
            return { ...prev, focusDays: days };
        });
    };

    // --- Render Steps Logic ---

    const renderStepContent = () => {
        switch (step) {
            case 0: // Work Hours
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Start Time</label>
                                <input
                                    type="time"
                                    value={formData.workStart}
                                    onChange={(e) => setFormData({ ...formData, workStart: e.target.value })}
                                    className={`w-full p-4 rounded-xl border outline-none text-lg ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                        }`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>End Time</label>
                                <input
                                    type="time"
                                    value={formData.workEnd}
                                    onChange={(e) => setFormData({ ...formData, workEnd: e.target.value })}
                                    className={`w-full p-4 rounded-xl border outline-none text-lg ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                        }`}
                                />
                            </div>
                        </div>
                        <div className={`p-4 rounded-lg text-sm flex items-start gap-3 ${isDark ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                            <Briefcase className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p>We will try to fit all your "High Priority" tasks within these hours.</p>
                        </div>
                    </div>
                );

            case 1: // Energy Peak
                return (
                    <div className="grid grid-cols-1 gap-3">
                        {['morning', 'afternoon', 'evening'].map((peak) => (
                            <button
                                key={peak}
                                onClick={() => setFormData({ ...formData, energyPeak: peak })}
                                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${formData.energyPeak === peak
                                        ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500'
                                        : isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {peak === 'morning' && <Sun className={`w-5 h-5 ${formData.energyPeak === peak ? 'text-amber-500' : 'text-slate-400'}`} />}
                                    {peak === 'afternoon' && <Zap className={`w-5 h-5 ${formData.energyPeak === peak ? 'text-amber-500' : 'text-slate-400'}`} />}
                                    {peak === 'evening' && <Battery className={`w-5 h-5 ${formData.energyPeak === peak ? 'text-amber-500' : 'text-slate-400'}`} />}
                                    <span className={`capitalize font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{peak}</span>
                                </div>
                                {formData.energyPeak === peak && <CheckCircle2 className="w-5 h-5 text-amber-500" />}
                            </button>
                        ))}
                    </div>
                );

            case 2: // Task Duration
                return (
                    <div className="space-y-8">
                        <div className="relative pt-6 pb-2">
                            <input
                                type="range"
                                min="15" max="120" step="15"
                                value={formData.avgTaskDuration}
                                onChange={(e) => setFormData({ ...formData, avgTaskDuration: e.target.value })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                            />
                            <div className="flex justify-between mt-4 text-sm font-medium text-slate-500">
                                <span>15m</span>
                                <span className={`text-xl font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{formData.avgTaskDuration} min</span>
                                <span>2h</span>
                            </div>
                        </div>
                        <p className={`text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            We recommend 45-60 minutes for optimal focus cycles (Pomodoro technique).
                        </p>
                    </div>
                );

            case 3: // Focus Days
                return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                            const isSelected = formData.focusDays.includes(day);
                            return (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${isSelected
                                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                                            : isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    {day.slice(0, 3)}
                                </button>
                            );
                        })}
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className={`min-h-screen flex ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>

            {/* LEFT SIDE: Form */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-24 flex flex-col justify-center relative">

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800">
                    <motion.div
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-md mx-auto w-full"
                    >
                        {/* Step Header */}
                        <div className="mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-50'}`}>
                                {steps[step].icon}
                            </div>
                            <h1 className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {steps[step].title}
                            </h1>
                            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {steps[step].subtitle}
                            </p>
                        </div>

                        {/* Dynamic Content */}
                        <div className="mb-10">
                            {renderStepContent()}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between">
                            {step > 0 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className={`text-sm font-semibold ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    Back
                                </button>
                            ) : <div></div>}

                            <button
                                onClick={handleNext}
                                disabled={loading}
                                className="group flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40"
                            >
                                {loading ? 'Setting up...' : step === steps.length - 1 ? 'Finish Setup' : 'Next Step'}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT SIDE: Visuals */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden bg-slate-900">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-indigo-900/40 mix-blend-multiply z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                        <img
                            src={steps[step].image}
                            alt="Onboarding Visual"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-12 left-12 right-12 z-20">
                    <h3 className="text-white text-xl font-bold mb-2">ClarityAI Intelligence</h3>
                    <p className="text-slate-300">
                        "By understanding your work habits, we can create a schedule that feels natural, not forced."
                    </p>
                </div>
            </div>

        </div>
    );
}