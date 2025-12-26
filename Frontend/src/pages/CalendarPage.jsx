import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { useTheme } from '../components/ThemeContext';
import CalendarToolbar from '../components/CalendarToolbar';
import AddTaskModal from '../components/AddTaskModal';

// Ensure your CSS file is imported here
import '../calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

/* -------------------------------------------------------------------------- */
/* Internal Component: CalendarEvent                    */
/* -------------------------------------------------------------------------- */
const CalendarEvent = ({ event }) => {
  const { isDark } = useTheme();

  // Color logic based on priority
  const getEventStyles = () => {
    const priority = event.resource?.priority || 'medium';

    // Light Mode Colors
    const lightColors = {
      high: 'bg-rose-50 text-rose-700 border-l-rose-500',
      medium: 'bg-indigo-50 text-indigo-700 border-l-indigo-500',
      low: 'bg-emerald-50 text-emerald-700 border-l-emerald-500',
    };

    // Dark Mode Colors
    const darkColors = {
      high: 'bg-rose-900/30 text-rose-100 border-l-rose-500',
      medium: 'bg-indigo-900/30 text-indigo-100 border-l-indigo-500',
      low: 'bg-emerald-900/30 text-emerald-100 border-l-emerald-500',
    };

    return isDark ? darkColors[priority] : lightColors[priority];
  };

  return (
    <div className={`h-full w-full border-l-[3px] p-1 text-xs rounded-r-sm leading-tight overflow-hidden ${getEventStyles()}`}>
      <div className="font-bold truncate">{event.title}</div>
      <div className="opacity-80 text-[10px] uppercase tracking-wider mt-0.5">
        {event.resource?.category}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Main Page Component                                  */
/* -------------------------------------------------------------------------- */
export default function CalendarPage() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Sample Data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Design Review',
      start: new Date(new Date().setHours(10, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0)),
      resource: { priority: 'high', category: 'work' }
    },
    {
      id: 2,
      title: 'Gym',
      start: new Date(new Date().setHours(18, 0, 0)),
      end: new Date(new Date().setHours(19, 0, 0)),
      resource: { priority: 'low', category: 'health' }
    }
  ]);

  // --- Handlers ---

  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...event, start, end }];
    });
  }, []);

  const resizeEvent = useCallback(({ event, start, end }) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...event, start, end }];
    });
  }, []);

  const handleSelectSlot = useCallback(({ start, end }) => {
    const startTime = moment(start).format('HH:mm');
    const duration = moment.duration(moment(end).diff(moment(start))).asHours();
    setSelectedSlot({ time: startTime, duration, title: '' });
    setIsOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    const startTime = moment(event.start).format('HH:mm');
    const duration = moment.duration(moment(event.end).diff(moment(event.start))).asHours();
    setSelectedSlot({
      id: event.id, title: event.title, time: startTime, duration,
      priority: event.resource?.priority, category: event.resource?.category
    });
    setIsOpen(true);
  }, []);

  const handleSave = (data) => {
    const start = moment(data.time, 'HH:mm').toDate();
    // Note: In production, handle the Date object correctly based on the day clicked
    const today = new Date();
    start.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    const end = moment(start).add(data.duration, 'hours').toDate();

    setEvents(prev => {
      const newEvent = {
        id: data.id || Math.random(),
        title: data.title,
        start,
        end,
        resource: { priority: data.priority, category: data.category }
      };

      if (data.id) return [...prev.filter(e => e.id !== data.id), newEvent];
      return [...prev, newEvent];
    });
    setIsOpen(false);
  };

  // --- Styling Logic (Fixes Grid & Colors) ---

  // 1. Grid Lines (Horizontal & Vertical borders)
  const slotPropGetter = useCallback(() => ({
    style: {
      borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0',
      backgroundColor: 'transparent'
    },
  }), [isDark]);

  // 2. Background Cells (Fixes white cells in month/day view)
  const dayPropGetter = useCallback((date) => {
    const isToday = moment(date).isSame(moment(), 'day');

    let backgroundColor = 'transparent';
    if (isToday) {
      backgroundColor = isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)';
    }

    return {
      style: {
        backgroundColor,
        // Vertical separator lines
        borderLeft: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0',
      }
    };
  }, [isDark]);

  return (
    <div className={`h-screen p-4 sm:pt-20 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>

      {/* Calendar Card Container */}
      <div className={`h-[85vh] p-4 rounded-3xl shadow-xl border flex flex-col ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
        }`}>

        <DnDCalendar
          localizer={localizer}
          events={events}
          defaultView="week"
          views={['month', 'week', 'day']}
          step={15}
          timeslots={4}

          // Interactions
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          resizable

          // Dynamic Styles
          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}

          // Components
          components={{
            toolbar: (props) => <CalendarToolbar {...props} isDark={isDark} />,
            event: CalendarEvent
          }}

          // Base Text Color (Affects time labels)
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        />
      </div>

      <AddTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={selectedSlot}
        onSave={handleSave}
      />
    </div>
  );
}