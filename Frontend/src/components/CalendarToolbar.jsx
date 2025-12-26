import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarToolbar({ isDark, onNavigate, onView, view, label }) {

    // Define styles based on isDark directly
    const containerClass = isDark
        ? 'bg-slate-800 border-white/10 text-white'
        : 'bg-slate-100 border-slate-200 text-slate-700';

    const buttonBaseClass = "transition-all rounded-md flex items-center justify-center";
    const buttonHoverClass = isDark ? 'hover:bg-white/10' : 'hover:bg-white hover:shadow-sm';
    const iconColor = isDark ? 'text-slate-300' : 'text-slate-600';

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 p-2">

            {/* LEFT: Navigation */}
            <div className="flex items-center gap-4">
                <div className={`flex items-center p-1 rounded-lg border ${containerClass}`}>
                    <button
                        onClick={() => onNavigate('PREV')}
                        className={`p-1.5 ${buttonBaseClass} ${buttonHoverClass}`}
                    >
                        <ChevronLeft size={18} className={iconColor} />
                    </button>

                    <button
                        onClick={() => onNavigate('TODAY')}
                        className={`px-3 py-1 text-sm font-bold mx-1 ${buttonBaseClass} ${buttonHoverClass} ${isDark ? 'text-white' : 'text-slate-800'}`}
                    >
                        Today
                    </button>

                    <button
                        onClick={() => onNavigate('NEXT')}
                        className={`p-1.5 ${buttonBaseClass} ${buttonHoverClass}`}
                    >
                        <ChevronRight size={18} className={iconColor} />
                    </button>
                </div>

                <h2 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                    <CalendarIcon size={20} className="text-indigo-500 hidden sm:block" />
                    <span>{label}</span>
                </h2>
            </div>

            {/* RIGHT: View Switcher */}
            <div className={`flex p-1 rounded-lg border ${containerClass}`}>
                {['month', 'week', 'day'].map((v) => {
                    const isActive = view === v;
                    const activeClass = isDark
                        ? 'bg-slate-600 text-white shadow-sm ring-1 ring-white/10'
                        : 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5';
                    const inactiveClass = isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700';

                    return (
                        <button
                            key={v}
                            onClick={() => onView(v)}
                            className={`px-4 py-1.5 rounded-md text-sm font-semibold capitalize transition-all ${isActive ? activeClass : inactiveClass}`}
                        >
                            {v}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}