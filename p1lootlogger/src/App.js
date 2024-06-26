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
import { ResetPasswordPage } from "./pages/resetpassword.jsx";
import { BossData } from "./pages/bossdata.jsx";
import { ItemData } from "./pages/itemdata.jsx";

export function App() {
  const [loggedIn, setLoggedIn] = useState("out")

  useEffect(() => {
    console.log("hello from app")
    if (localStorage.getItem("P1LL_TOKEN")) {
      setLoggedIn("in")
    }
  }, [])

  return (
    <LoginProvider loggedIn={loggedIn} setLoggedIn={setLoggedIn} >
      <ChakraProvider>
        <BrowserRouter>
          <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route exact path="/" element={<HomePage />} />
            <Route path="/tables" element={<TablesPage />} />
            <Route path="/itemtable" element={<ItemTable />} />
            <Route path="/bosstable" element={<BossTable />} />
            <Route path="/bossinfo" element={<BossInfo />} />
            <Route path="/bossdetails" element={<BossDetails />} />
            <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/createaccount" element={<CreateAccountPage />} />
            <Route path="/settings" element={<SettingsPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/submitloot" element={<SubmitLootPage />} />
            <Route path="/verifyemail" element={<VerifyEmailPage />} />
            <Route path="/resetpassword" element={<ResetPasswordPage />} />
            <Route path="/bossdata/:id" element={<BossData />} />
            <Route path="/itemdata/:id" element={<ItemData />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </LoginProvider>
  );
}
