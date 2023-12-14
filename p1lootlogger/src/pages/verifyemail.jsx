import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { LoginBox, LoginFlex, LoginStack } from "../components/pagestyles"

export const VerifyEmailPage = (res) => {
  const [responseFromDb, setResponseFromDb] = useState({})

  const location = useLocation();
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tokenFromQueryString = params.get("token")
  const emailFromQueryString = params.get("email")

  console.log(tokenFromQueryString, emailFromQueryString)

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
        setResponseFromDb(responseData)
      }
      else {
       console.log("Error in POST request")
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    compareStringsToDb()
  }, []);

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Heading fontSize={"2xl"} py={3} marginTop={"-8.5em"} marginBottom={"-1 em"}>Verify Email</Heading>
        <Box sx={LoginBox}>
          {responseFromDb.response && 
          <Stack align={"center"}>
            <Text color={"#FDCA40"}>{responseFromDb.response}</Text>
            <Link to="/login">
              <Text color={"#BFA55C"}>You can click here to login</Text>
            </Link>
          </Stack>}
          {responseFromDb.error && responseFromDb.status !== 409 &&
          <Stack align={"center"}>
            <Text color={"#FDCA40"}>{responseFromDb.error}</Text>
          </Stack>}
          {responseFromDb.status === 409 && 
          <Stack align={"center"}>
            <Text color={"#FDCA40"}>{responseFromDb.error}</Text>
            <Link to="/login">
              <Text color={"#BFA55C"}>You can click here to login</Text>
            </Link>
          </Stack>}
        </Box>
      </Stack>
    </Flex>
  )
}
