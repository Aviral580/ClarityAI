import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/CalendarPage';
import Input from './pages/Input';
import Summary from './pages/Summary';
import Settings from './pages/Settings';
import Contact from './pages/Contact';

export default function App() {
  const NAVBAR_HEIGHT = 80; // same height as Navbar (h-20)

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Spacer to push content below fixed navbar */}
      {/* <div style={{ height: NAVBAR_HEIGHT }} /> */}

      {/* Page Content */}
      <main className="flex-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/input" element={<Input />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
