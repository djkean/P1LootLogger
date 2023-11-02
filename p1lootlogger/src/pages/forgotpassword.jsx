import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginStack, SettingsBox } from "../components/pagestyles"; 
import { checkEmailRegex } from "../components/emailVerification";

export function ForgotPassword() {
  const [confirmEmail, setConfirmEmail] = useState({email: ""})
  const [forgotPasswordError, setForgotPasswordError] = useState("")

  const emailField = (event) => {
    setConfirmEmail(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const navigate = useNavigate()
  const submitEmail = (event) => {
    event.preventDefault();
    setForgotPasswordError(checkEmailRegex(confirmEmail))
    let error = checkEmailRegex(confirmEmail)
    setForgotPasswordError(error)
    console.log(error.email)
    if (error.email === "") {
      axios.post("/forgotpassword", confirmEmail)
      .then(res => {
        console.log("EMAIL SENT (AXIOS)")
        navigate("/login")
      })
      .catch(err => console.log("ERROR WITH EMAIL FIELD (AXIOS)", err))
      console.log(confirmEmail)
    }
  }

  return (
    <Flex sx={LoginStack} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align="center">
        <Stack as="form" paddingTop={"2em"} onSubmit={submitEmail}>
          <Heading fontSize={"3xl"} py={3}>Forgot Password</Heading>
          <FormControl id="forgot--password" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Forgot your Password?:</FormLabel>
            <Text sx={FormContext}>Enter your email:</Text>
            <Input type="email" sx={InputFieldColors} id="forgot--email" name="email" onChange={emailField()}/>
            {forgotPasswordError.error && <Text>{forgotPasswordError.error}</Text>}
            <Center>
              <Input type="submit" sx={FormButton} value="Submit"/>
            </Center>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  )
}