import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contexto from "./Contexto";
import Cartas from "./Cartas";
import Entrada from "./Entrada";
import History from "./History";

export default function App() {
  return (
    <Contexto>
      <BrowserRouter>
        <Entrada />
        <Routes>
          <Route path="/" element={<Cartas />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
    </Contexto>
  );
}
