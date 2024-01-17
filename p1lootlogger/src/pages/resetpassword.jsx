import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, LoginFeedback, SettingsBox } from "../components/pagestyles";
import axios from "axios";

export function ResetPasswordPage() {
  const [resetPasswordRes, setResetPasswordRes] = useState({})
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
    /*try {
      const resetPasswordResponse = await fetch()
    } */
  }

  const handleFields = (event) => {
    setNewPassword(_ => ({ ..._, [event.target.name]: event.target.value }))
  }

  const submitPassword = async (event) => {
    event.preventDefault()

  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>Reset Password</Heading>
        </Stack>
      </Stack>
      <Box sx={SettingsBox} as="form" id="reset--form" onSubmit={submitPassword}>
        <Stack spacing={3}>
          <FormControl id="password" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Create your new password</FormLabel>
            <Text sx={FormContent}>Type your new password</Text>
            <Input type="password" sx={InputFieldColors} id="firstField" name="firstField" onChange={handleFields}></Input>
            <Text sx={FormContent}>Re-type your new password</Text>
            <Input type="password" sx={InputFieldColors} id="secondField" name="secondField" onChange={handleFields}></Input>
          </FormControl>
        </Stack>
      </Box>
    </Flex>
  )

}