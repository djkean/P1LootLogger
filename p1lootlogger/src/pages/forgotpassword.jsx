import { React, useState } from "react";
import axios from "axios";
import { Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback } from "../components/pagestyles"; 
import { checkEmailRegex } from "../components/regexChecks";

export function ForgotPassword() {
  const [confirmEmail, setConfirmEmail] = useState({email: ""});
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordRes, setForgotPasswordRes] = useState({});

  const emailField = (event) => {
    setConfirmEmail(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const submitEmail = (event) => {
    event.preventDefault();
    setForgotPasswordError(checkEmailRegex(confirmEmail))
    let error = checkEmailRegex(confirmEmail)
    setForgotPasswordError(error)
    console.log(forgotPasswordError, confirmEmail)
    if (error.email === "") {
      axios.post("/forgotpassword", confirmEmail)
      .then(res => {
        setForgotPasswordRes(res.data)
        console.log("EMAIL SENT (AXIOS)")
      })
      .catch(err => {
        setForgotPasswordRes(err.response.data)
        console.log("ERROR WITH EMAIL FIELD (AXIOS)", err)
      })
    }
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
      <Heading fontSize={"3xl"} py={3}>Forgot Password</Heading>
      {forgotPasswordRes.message && <Stack align={"center"} sx={LoginFeedback}>
        <Text color={forgotPasswordRes.code}>{forgotPasswordRes.message}</Text>
      </Stack>}
        <Stack sx={LoginBox} as="form" paddingTop={"2em"} onSubmit={submitEmail}>
          <FormControl id="forgot--password" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Forgot your Password?</FormLabel>
            <Text sx={FormContext}>Enter your email:</Text>
            <Input type="email" sx={InputFieldColors} id="forgot--email" name="email" onChange={emailField}/>
            {forgotPasswordError.email && <Text>{forgotPasswordError.email}</Text>}
            <Center>
              <Input type="submit" sx={FormButton} value="Submit"/>
            </Center>
            <Text color={"#BFA55C"} align={"center"}>We will send you a confirmation email</Text>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  ) 
}