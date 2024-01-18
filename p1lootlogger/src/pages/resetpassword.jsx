import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback, SettingsBox } from "../components/pagestyles";
import { checkResetPasswordRegex } from "../components/passwordVerification";
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

  console.log(tokenFromQueryString, emailFromQueryString)

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
    setNewPassword(_ => ({ ..._, [event.target.name]: event.target.value }))
  }

  const submitPassword = async (event) => {
    event.preventDefault();
    setPasswordFieldError(checkResetPasswordRegex(newPassword))
    axios.post("http://localhost:8080/resetpassword", newPassword)
    .then(res => {
      
    })
    //need to make query for this first - dont forget!
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>Reset Password</Heading>
        </Stack>
        <Box sx={LoginBox} id="reset--form" onSubmit={submitPassword}>
        <Stack as="form" spacing={3}>
          <FormControl id="password" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Create your new password</FormLabel>
            <Text sx={FormContext}>Type your new password</Text>
            <Input type="password" sx={InputFieldColors} id="firstField" name="firstField" onChange={handleFields}></Input>
            <Text sx={FormContext}>Re-type your new password</Text>
            <Input type="password" sx={InputFieldColors} id="secondField" name="secondField" onChange={handleFields}></Input>
          </FormControl>
          <Center>
            <Input type="submit" sx={FormButton} value="Change Password"></Input>
          </Center>
        </Stack>
      </Box>
      </Stack>
    </Flex>
  )

}