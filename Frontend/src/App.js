import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context & Protection
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    
      <div className="min-h-screen flex flex-col">

            <AuthProvider>
            <Navbar />
        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
           
            {/* --- Protected Routes (Require Login Cookies) --- */}
            <Route path="/dashboard" element={
              <ProtectedRoute> <Dashboard /> </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute> <Calendar /> </ProtectedRoute>
            } />
            <Route path="/input" element={
              <ProtectedRoute> <Input /> </ProtectedRoute>
            } />
            <Route path="/summary" element={
              <ProtectedRoute> <Summary /> </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute> <Settings /> </ProtectedRoute>
            } />
          </Routes>
        </main>
            </AuthProvider>

        <Footer />
      </div>
  );
}