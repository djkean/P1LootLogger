import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback, SettingsBox } from "../components/pagestyles";
import { comparePasswords } from "../components/regexChecks";
import axios from "axios";

export function ResetPasswordPage() {
  const [authenticateResetRes, setAuthenticateResetRes] = useState({})
  const [resetPasswordRes, setResetPasswordRes] = useState({})
  const [passwordFieldError, setPasswordFieldError] = useState({})
  const [newPassword, setNewPassword] = useState({
    firstField: "",
    secondField: "",
  })

  const location = useLocation();
  const queryString = location.search
  const params = new URLSearchParams(queryString)
  const tokenFromQueryString = params.get("token")
  const emailFromQueryString = params.get("email")

  const compareStringsToDb = async () => {
    if (typeof tokenFromQueryString === "undefined" || typeof emailFromQueryString == "undefined") {
      return
    }
    try {
      const resetPasswordResponse = await fetch("/api/resetpassword", {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify({
          token: tokenFromQueryString,
          email: emailFromQueryString
        })
      })
      if (resetPasswordResponse.ok) {
        const responseData = await resetPasswordResponse.json()
        setResetPasswordRes(responseData)
      }
      else {
        console.log("Error in POST request")
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  const handleFields = (event) => {
    setNewPassword(_ => ({ ..._, [event.target.name]: event.target.value, 
      stringEmail: emailFromQueryString, 
      stringToken: tokenFromQueryString
    }))
  }

  const submitPassword = async (event) => {
    event.preventDefault();
    setPasswordFieldError(comparePasswords(newPassword.firstField, newPassword.secondField))
    axios.post("http://localhost:8080/createnewpassword", newPassword)
    .then(res => {
      console.log("SUCCESS (AXIOS)")
      setAuthenticateResetRes(res.data)
    })
    .catch(err => {
      setAuthenticateResetRes(err.response.data)
      console.log("ERROR (AXIOS)")
    })
  }

  useEffect(() => {
    compareStringsToDb()
  }, []);

//fix the card for backend response!

  return (
    <Flex sx={LoginFlex} align={"center"}>
      {resetPasswordRes.response && <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>Reset Password</Heading>
        </Stack>
        <Box sx={LoginBox} id="reset--form" onSubmit={submitPassword}>
          {authenticateResetRes.message && 
          <Stack align={"center"}>
            <Text color={"#FDCA40"}>{authenticateResetRes.message}.</Text> 
            {authenticateResetRes.code === "green" &&
            <Link to="/login">
              <Text color={"green"}>Click here to log in</Text>
            </Link>}
          </Stack>}
        <Stack as="form" spacing={3}>
          <FormControl id="password" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Create your new password</FormLabel>
            <Text sx={FormContext}>Type your new password</Text>
            <Input type="password" sx={InputFieldColors} id="firstField" name="firstField" onChange={handleFields}/>
            {passwordFieldError.firstField && <Text>{passwordFieldError.firstField}</Text>}
            <Text sx={FormContext}>Re-type your new password</Text>
            <Input type="password" sx={InputFieldColors} id="secondField" name="secondField" onChange={handleFields}/>
            {passwordFieldError.secondField && <Text>{passwordFieldError.secondField}</Text>}
          </FormControl>
          <Center>
            <Input type="submit" sx={FormButton} value="Change Password"></Input>
          </Center>
        </Stack>
      </Box>
      </Stack>}
      {resetPasswordRes.error && 
       <Stack sx={LoginStack} align={"center"}>
        <Box sx={LoginBox}>
          <Stack align={"center"}>
            <Text color={"#FDCA40"}>{resetPasswordRes.error}</Text> 
          </Stack>
        </Box>
       </Stack>
      }
    </Flex>
  )
}