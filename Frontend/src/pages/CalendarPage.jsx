import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { useTheme } from '../components/ThemeContext';
import CalendarToolbar from '../components/CalendarToolbar';
import AddTaskModal from '../components/AddTaskModal';
import { taskService } from '../services/taskService';

import '../calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const formatTaskForCalendar = (task) => {
  const pMap = { 1: 'high', 2: 'medium', 3: 'low' };

  return {
    id: task._id,
    title: task.title,

    // ✅ CORRECT: Let JS handle timezone conversion
    start: task.start ? new Date(task.start) : null,
    end: task.end ? new Date(task.end) : null,

    resource: {
      priority: pMap[task.priority] || 'medium',
      category: task.category || 'work',
      description: task.description
    }
  };
};


/* -------------------------------------------------------------------------- */
/* Component: CalendarEvent (Visuals)                                         */
/* -------------------------------------------------------------------------- */
const CalendarEvent = ({ event }) => {
  const { isDark } = useTheme();

  const getEventStyles = () => {
    const priority = event.resource?.priority || 'medium';

    const lightColors = {
      high: 'bg-rose-50 text-rose-700 border-l-rose-500',
      medium: 'bg-indigo-50 text-indigo-700 border-l-indigo-500',
      low: 'bg-emerald-50 text-emerald-700 border-l-emerald-500',
    };

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
/* Main Page Component                                                        */
/* -------------------------------------------------------------------------- */
export default function CalendarPage() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // State for Real Data
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week');
  const [date, setDate] = useState(new Date());

  // 1. FETCH TASKS (READ)
  const fetchEvents = useCallback(async () => {
    try {
      // Fetch a wide range (e.g., current month +/-)
      // In production, calculate strictly based on 'view' and 'date'
      const start = moment(date).subtract(1, 'month').toDate();
      const end = moment(date).add(1, 'month').toDate();

      const response = await taskService.fetchTasks(start, end);

      // Look at the API response structure. 
      // If your backend returns { data: [...] }, use response.data
      // If it returns [...], use response directly.
      const tasks = response.data || response;

      const formatted = tasks.map(formatTaskForCalendar);
      setEvents(formatted);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  }, [date]);

  // Load on mount or when date changes
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);


  // 2. MOVE EVENT (UPDATE via Drag & Drop)
  const moveEvent = useCallback(async ({ event, start, end }) => {
    // Optimistic UI Update (Make it feel instant)
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...event, start, end }];
    });

    try {
      await taskService.updateTask(event.id, {
        start: start.toISOString(),
        end: end.toISOString()
      });
    } catch (error) {
      console.error("Move failed:", error);
      fetchEvents(); // Revert on failure
    }
  }, [fetchEvents]);


  // 3. RESIZE EVENT (UPDATE via Drag to Resize)
  const resizeEvent = useCallback(async ({ event, start, end }) => {
    setEvents((prev) => {
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...event, start, end }];
    });

    try {
      // Calculate new duration in minutes
      const duration = moment(end).diff(moment(start), 'minutes');

      await taskService.updateTask(event.id, {
        start: start.toISOString(),
        end: end.toISOString(),
        duration: duration
      });
    } catch (error) {
      console.error("Resize failed:", error);
      fetchEvents();
    }
  }, [fetchEvents]);


  // 4. SAVE (CREATE or EDIT via Modal)
  const handleSave = async (data) => {
    try {
      // 🔴 CRITICAL FIX: Force the string to look like UTC
      // Input: Date="2026-01-09", Time="17:00"
      // We manually attach ".000Z" so MongoDB saves exactly "17:00:00Z"
      // This matches your AI's data format.
      const startISO = `${data.date}T${data.time}:00.000Z`;
      const start = new Date(startISO); // This object technically holds 10:30PM IST, but the ISO string is 17:00Z
  
      // Calculate End Time manually to preserve this format
      const durationMinutes = parseFloat(data.duration) * 60;
      // Get the timestamp of our "fake UTC" start and add minutes
      const endTimestamp = new Date(startISO).getTime() + (durationMinutes * 60000); 
      const end = new Date(endTimestamp); 
  
      const pMapReverse = { 'high': 1, 'medium': 2, 'low': 3 };
  
      const payload = {
        title: data.title,
        duration: durationMinutes,
        priority: pMapReverse[data.priority] || 2,
        category: data.category,
        start: start, // Sends 17:00Z
        end: end,     // Sends 18:00Z
        status: "scheduled",
        description: data.description || "" 
      };
  
      if (data.id) {
        await taskService.updateTask(data.id, payload);
      } else {
        await taskService.createTask(payload);
      }
  
      setIsOpen(false);
      fetchEvents(); 
  
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save task. Check console.");
    }
  };

  // --- Handlers for UI ---
  const handleSelectSlot = useCallback(({ start, end }) => {
    const startTime = moment(start).format('HH:mm');
    // Default 1h or calculated
    const duration = moment.duration(moment(end).diff(moment(start))).asHours() || 1;
    setSelectedSlot({ date: start, time: startTime, duration, title: '' });
    setIsOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event) => {
    // Populate modal for editing
    const startTime = moment(event.start).format('HH:mm');
    const duration = moment.duration(moment(event.end).diff(moment(event.start))).asHours();

    setSelectedSlot({
      id: event.id,
      title: event.title,
      date: event.start,
      time: startTime,
      duration,
      priority: event.resource?.priority,
      category: event.resource?.category,
      description: event.resource?.description || ""
    });
    setIsOpen(true);
  }, []);

  // --- Styles ---
  const slotPropGetter = useCallback(() => ({
    style: {
      borderTop: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0',
      backgroundColor: 'transparent'
    },
  }), [isDark]);
  
  const handleDelete = async (taskId) => {
    try {
        await taskService.deleteTask(taskId); // Assumes you have this in taskService
        setIsOpen(false);
        fetchEvents(); // Refresh calendar
    } catch (error) {
        console.error("Delete failed:", error);
    }
};

  const dayPropGetter = useCallback((date) => {
    const isToday = moment(date).isSame(moment(), 'day');
    const backgroundColor = isToday
      ? (isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.05)')
      : 'transparent';

    return {
      style: {
        backgroundColor,
        borderLeft: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid #e2e8f0',
      }
    };
  }, [isDark]);

  return (
    <div className={`h-screen p-4 sm:pt-20 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`h-[85vh] p-4 rounded-3xl shadow-xl border flex flex-col ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>

        <DnDCalendar
          localizer={localizer}
          events={events} // Using State from API
          defaultView="week"
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          views={['month', 'week', 'day']}
          step={15}
          timeslots={4}

          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          resizable

          dayPropGetter={dayPropGetter}
          slotPropGetter={slotPropGetter}
          components={{
            toolbar: (props) => <CalendarToolbar {...props} isDark={isDark} />,
            event: CalendarEvent
          }}
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        />
      </div>

      <AddTaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={selectedSlot}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}