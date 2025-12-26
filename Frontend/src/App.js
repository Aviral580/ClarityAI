import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
// import Features from './pages/Features';
import About from './pages/About'

export default function App() {
  return (
    <>
      <Navbar />

      {/* Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}
          {/* <Route path="/features" element={<Features />} /> */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
