"use client";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "@/node_modules/react-router-dom/dist/index";
import InicioDeSesion from "./InicioSesion/page";
import Home from "./Home/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioDeSesion />} />
        <Route path="/InicioSesion" element={<InicioDeSesion />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
