import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./shared/components/Nav/Nav.jsx";
import { HomePage } from "./pages/home";
import { TablesPage } from "./pages/tables";
import { ItemTableResults } from "./pages/itemTableResults";
import { ChakraProvider } from "@chakra-ui/react";

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/itemtableresults" element={<ItemTableResults />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
