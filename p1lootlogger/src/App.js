import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./shared/components/Nav/Nav.jsx";
import { HomePage } from "./pages/home";
import { TablesPage } from "./pages/tables";

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tables" element={<TablesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
