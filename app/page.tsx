"use client";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import InicioDeSesion from "./InicioSesion/page";
import Home from "./Home/page";
import ResultadoBusqueda from "./ResultadoBusqueda/page";
import Perfil from "./PerfilUsuario/page";
import PerfilUsuario from "./Perfil/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioDeSesion />} />
        <Route path="/InicioSesion" element={<InicioDeSesion />} />
        <Route path="/PerfilUsuario" element={<Perfil />} />
        <Route path="/Perfil" element={<PerfilUsuario />} />
        <Route path="/ResultadoBusqueda" element={<ResultadoBusqueda />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
