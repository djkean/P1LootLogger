import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./shared/components/Nav/Nav.jsx";
import { HomePage } from "./pages/home";
import { TablesPage } from "./pages/tables";
import { ItemTable } from "./pages/itemtable";
import { BossTable } from "./pages/bosstable.jsx";
import { BossInfo } from "./pages/bossinfo.jsx";
import { BossDetails } from "./pages/bossdetails.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { CreateAccountPage } from "./pages/createaccount.jsx";
import { LoginPage } from "./pages/login.jsx";
import { SettingsPage } from "./pages/settings.jsx";
import { ForgotPassword } from "./pages/forgotpassword.jsx";
import { SubmitLootPage } from "./pages/submitloot.jsx";
import { VerifyEmailPage } from "./pages/verifyemail.jsx";
import { LoginProvider } from "./LoginContext.js";


export function App() {

  const [loggedIn, setLoggedIn] = useState("out")


  useEffect(() => {
    console.log("hello from app")
    if (localStorage.getItem("P1LL_TOKEN")) {
      setLoggedIn("in")
      console.log("you hit this")
    }
    console.log(loggedIn)
  }, [])

  return (
  <LoginProvider loggedIn={loggedIn} setLoggedIn={setLoggedIn} >
    <ChakraProvider>
      <BrowserRouter>
        <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/itemtable" element={<ItemTable />} />
          <Route path="/bosstable" element={<BossTable />} />
          <Route path="/bossinfo" element={<BossInfo />} />
          <Route path="/bossdetails" element={<BossDetails />} />
          <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/submitloot" element={<SubmitLootPage />} />
          <Route path="/verifyemail" element={<VerifyEmailPage/>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </LoginProvider>


  );
}
