import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./shared/components/Nav/Nav.jsx";
import { HomePage } from "./pages/home";
import { TablesPage } from "./pages/tables";
import { ItemTable } from "./pages/itemtable";
import { BossTable } from "./pages/bosstable.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { CreateAccountPage } from "./pages/createaccount.jsx";

export function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/itemtable" element={<ItemTable />} />
          <Route path="/bosstable" element={<BossTable />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
