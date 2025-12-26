import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, AlignLeft, Flag } from 'lucide-react';
import { useTheme } from './ThemeContext'; // Assuming you have this based on your snippet

export default function AddTaskModal({ isOpen, onClose, onSave, initialData }) {
    const { isDark } = useTheme();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        time: '09:00',
        duration: 1,
        priority: 'medium',
        category: 'work',
        note: ''
    });

    // Populate form when opening with data (e.g. clicking a time slot)
    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ ...prev, ...initialData }));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className={`relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 border border-white/10' : 'bg-white'
                        }`}
                >
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                        <h2 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600`}>
                            {initialData?.id ? 'Edit Task' : 'New Task'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">

                        {/* Task Name */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Task Name</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Design System Review"
                                className={`w-full p-3 rounded-xl border outline-none transition-all ${isDark
                                        ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500'
                                        : 'bg-gray-50 border-gray-200 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
                                    }`}
                            />
                        </div>

                        {/* Time & Duration Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Start Time</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className={`w-full pl-10 p-3 rounded-xl border outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                                            }`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Duration (Hrs)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    step="0.5"
                                    min="0.5"
                                    max="8"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-xl border outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Priority & Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Priority</label>
                                <div className="relative">
                                    <Flag size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                    <select
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className={`w-full pl-10 p-3 rounded-xl border outline-none appearance-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`w-full p-3 rounded-xl border outline-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                                        }`}
                                >
                                    <option value="work">Work</option>
                                    <option value="personal">Personal</option>
                                    <option value="health">Health</option>
                                    <option value="learning">Learning</option>
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Notes</label>
                            <div className="relative">
                                <AlignLeft size={16} className="absolute left-3 top-3.5 text-gray-400" />
                                <textarea
                                    name="note"
                                    rows="3"
                                    value={formData.note}
                                    onChange={handleChange}
                                    placeholder="Add details..."
                                    className={`w-full pl-10 p-3 rounded-xl border outline-none resize-none ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-50 border-gray-200'
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all active:scale-95"
                            >
                                Save Schedule
                            </button>
                        </div>

                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}