import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
 
export const VerifyEmailPage = (res) => {
  const [responseFromDb, setResponseFromDb] = useState({})
  const location = useLocation();
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tokenFromQueryString = params.get("token")
  const emailFromQueryString = params.get("email")

  console.log("this is res", tokenFromQueryString, emailFromQueryString)

  const compareStringsToDb = async () => {
    if (typeof tokenFromQueryString === "undefined" || typeof emailFromQueryString === "undefined") {
      return
    }
    try {
      const verificationResponse = await fetch("/api/verifyemail", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({ 
            token: tokenFromQueryString, email: emailFromQueryString 
          })
      })
      if (verificationResponse.ok) {
        const responseData = await verificationResponse.json()
        console.log(responseData)
        setResponseFromDb(responseData)
      }
      else {
       console.log("error in POST request")
      }
    }
    catch(err) {
      console.log("verifyemail fetch failed", err)
    }
  }


  useEffect(() => {
    compareStringsToDb()
  }, []);

  return (<div>this is the very well developed verifyemail page</div>)
}