import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Usuario from "./components/pessoas";

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={
                    <div>
                        <h1>Controle Financeiro</h1>
                        <Link className="button" to="usuario">Usuarios</Link>
                    </div>
                } />
                <Route path="/usuario" element={<Usuario />} />
            </Routes>
        </BrowserRouter>
    )
}