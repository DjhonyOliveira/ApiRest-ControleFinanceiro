import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Usuarios from "./components/Usuarios";
import Metas from "./components/Metas";
import Transacoes from "./components/Transacoes";
import Categorias from "./components/Categorias";
import Dashboard from "./components/Dashboard";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/categorias" element={<Categorias />} />
      </Routes>
    </>
  );
}

export default Rotas;