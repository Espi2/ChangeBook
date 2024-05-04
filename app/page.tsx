"use client"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from '@/node_modules/react-router-dom/dist/index';
import InicioDeSesion from './InicioSesion/page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioDeSesion />} />
        <Route path="/InicioSesion" element={<InicioDeSesion />} />
      </Routes>
    </Router>
  );
}


export default App;