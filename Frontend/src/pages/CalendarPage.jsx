import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { useTheme } from '../components/ThemeContext';
import CalendarToolbar from '../components/CalendarToolbar';
import AddTaskModal from '../components/AddTaskModal'; // Re-use the modal from before!

// Import styles
import '../calendar.css'; 

// Setup the localizer
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function CalendarPage() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Initial Data (Must be JS Date objects for this library)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Design Review',
      start: new Date(new Date().setHours(10, 0, 0)),
      end: new Date(new Date().setHours(11, 30, 0)),
      resource: { priority: 'high', category: 'work' } // Custom data goes here
    },
    {
      id: 2,
      title: 'Lunch Break',
      start: new Date(new Date().setHours(13, 0, 0)),
      end: new Date(new Date().setHours(14, 0, 0)),
      resource: { priority: 'low', category: 'personal' }
    },
  ]);

  // --- Handlers provided by the library ---

  // 1. Moving an event
  const moveEvent = useCallback(({ event, start, end }) => {
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === event.id);
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...existing, start, end }];
    });
  }, []);

  // 2. Resizing an event
  const resizeEvent = useCallback(({ event, start, end }) => {
    setEvents((prev) => {
      const existing = prev.find((ev) => ev.id === event.id);
      const filtered = prev.filter((ev) => ev.id !== event.id);
      return [...filtered, { ...existing, start, end }];
    });
  }, []);

  // 3. Clicking an empty slot (to add task)
  const handleSelectSlot = useCallback(({ start, end }) => {
    // Format data for your modal
    const startTime = moment(start).format('HH:mm');
    // Calculate duration in hours
    const duration = moment.duration(moment(end).diff(moment(start))).asHours();
    
    setSelectedSlot({ time: startTime, duration, title: '' });
    setIsOpen(true);
  }, []);

  // 4. Clicking an existing event (to edit)
  const handleSelectEvent = useCallback((event) => {
    const startTime = moment(event.start).format('HH:mm');
    const duration = moment.duration(moment(event.end).diff(moment(event.start))).asHours();
    
    setSelectedSlot({ 
      id: event.id,
      title: event.title, 
      time: startTime, 
      duration,
      priority: event.resource?.priority,
      category: event.resource?.category
    });
    setIsOpen(true);
  }, []);

  // 5. Saving from Modal
  const handleSave = (data) => {
    const start = moment(data.time, 'HH:mm').toDate();
    // Use Today's date for the start time
    const today = new Date();
    start.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
    
    const end = moment(start).add(data.duration, 'hours').toDate();

    const newEvent = {
      id: data.id || Math.random(),
      title: data.title,
      start,
      end,
      resource: { priority: data.priority || 'medium', category: data.category || 'work' }
    };

    setEvents(prev => {
        // If editing, remove old one first
        if(data.id) return [...prev.filter(e => e.id !== data.id), newEvent];
        return [...prev, newEvent];
    });
  };

  // --- Custom Component to render the Event Block ---
  const EventComponent = ({ event }) => {
    const priorityColors = {
        high: 'border-l-rose-500 bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-100',
        medium: 'border-l-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-100',
        low: 'border-l-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-100',
    };
    
    const styleClass = priorityColors[event.resource?.priority] || priorityColors.medium;

    return (
      <div className={`h-full w-full border-l-4 p-1.5 text-xs font-medium rounded-r-md overflow-hidden ${styleClass}`}>
        <div className="font-bold">{event.title}</div>
        <div className="opacity-80 text-[10px] uppercase">{event.resource?.category}</div>
      </div>
    );
  };

  return (
    <div className={`pt-20 h-screen p-6 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`h-[85vh] p-4 rounded-3xl shadow-xl ${
        isDark ? 'bg-slate-900 border border-white/10' : 'bg-white'
      }`}>
        <DnDCalendar
          localizer={localizer}
          events={events}
          defaultView="day"
          views={['day', 'week', 'month']}
          step={15} // 15 min slots
          timeslots={4} // 4 slots per hour = 15 mins
          
          // Interaction Handlers
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          resizable
          
          // Customization
          components={{
            toolbar: CalendarToolbar,
            event: EventComponent
          }}
          
          // Theming
          className={isDark ? 'dark-calendar text-slate-300' : 'text-slate-700'}
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