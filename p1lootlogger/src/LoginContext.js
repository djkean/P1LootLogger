import React, { useContext, useState } from "react";

const LoginContext = React.createContext()
const LoginUpdateContext = React.createContext()

export function useLogin() {
  return useContext(LoginContext)
}

export function useLoginUpdate() {
  return useContext(LoginUpdateContext)
}

export function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState("out")

  function changeLoginValue() {
    if (loggedIn === "out") {
      setLoggedIn("in")
      console.log("was out, now in")
    }
    else if (loggedIn === "in") 
    {
      setLoggedIn("out")
      console.log("was in, now out")
      //localStorage.removeItem("P1LL_TOKEN")
    }
    else {
      console.log("how did you even manage this??")
    }
  }

  function logUserOut() {
    setLoggedIn("out")
  }

  function logUserIn() {
    setLoggedIn("in")
  }

  return (
    <LoginContext.Provider value={loggedIn}>
      <LoginUpdateContext.Provider value={changeLoginValue}>
        {children}
      </LoginUpdateContext.Provider>
    </LoginContext.Provider>
  )
}