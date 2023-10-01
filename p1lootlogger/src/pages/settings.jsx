import { React, useState } from "react";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, FormWarning, InputFieldColors, LoginFlex, LoginStack, SettingsBox } from "../components/pagestyles"; 
import { checkUsernameRegex, checkPasswordRegex } from "../components/settingsVerification";
import axios from "axios";
import { getToken } from "../shared/getToken";

export function SettingsPage() {
  const [newUsername, setNewUsername] = useState({username: "",})
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  })
  const [usernameError, setUsernameError] = useState({})
  const [passwordError, setpasswordError] = useState({})

  const changeUsername = (event) => {
    setNewUsername(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const changePassword = (event) => {
    setNewPassword(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const submitUsername = (event) => {
    event.preventDefault();
    setUsernameError(checkUsernameRegex(newUsername))
    let error = checkUsernameRegex(newUsername)
    setUsernameError(error)
    console.log(error.username)
    if (error.username === "") {
      axios.post("/changeusername", newUsername, 
    { headers: { "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json" } })
      .then(console.log("NAME CHANGE OK (AXIOS)"))
      .catch(err => console.log("ERROR CHANGING USERNAME (AXIOS)", err))
    console.log(newUsername)
    }
  } 

  const submitPassword = (event) => {
    event.preventDefault();
    setpasswordError(checkPasswordRegex(newPassword))
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>User Settings</Heading>
        </Stack>
        <Box sx={SettingsBox} id="settings--form">
          <Stack spacing={3}>
            <Stack as="form" id="change--user" onSubmit={submitUsername}>
              <FormControl id="username" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Change Username:</FormLabel>
                <Text sx={FormContext}> Enter your new Username: </Text>
                <Input type="text" sx={InputFieldColors} id="change--username" name="username" onChange={changeUsername}/>
                {usernameError.username && <Text>{usernameError.username}</Text>}
                <Center>
                  <Input type="submit" sx={FormButton} value="Change Username"/>
                </Center>
              </FormControl>
            </Stack>
            <Stack as="form" paddingTop={"2em"} onSubmit={submitPassword}>
              <FormControl id="change--password" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Change Password:</FormLabel>
                <Text sx={FormContext}>Type your current Password:</Text>
                <Input type="password" sx={InputFieldColors} id="oldPassword" name="oldPassword" onChange={changePassword}/>
                <Text sx={FormContext}>Type your new Password: </Text>
                <Input type="password" sx={InputFieldColors} id="newPassword1" name="newPassword1" onChange={changePassword}/>
                <Text sx={FormContext}>Re-type your new Password: </Text>
                <Input type="password" sx={InputFieldColors} id="newPassword2" name="newPassword2" onChange={changePassword}/>
                <Center>
                  <Input type="submit" sx={FormButton} value="Change Password"/>
                </Center>
              </FormControl>
            </Stack>
            <Stack as="form" paddingTop={"2em"}>
              <FormControl id="delete--account" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Delete Account:</FormLabel>
                <Text sx={FormContext}>Re-type your Password to confirm:</Text>
                <Input type="password" sx={InputFieldColors} id="del--acc--pass" name="delete--account"/>
                <Center>
                  <Input type="submit" sx={FormButton} value="Delete my Account"/>
                </Center>
                <Text sx={FormWarning}>This will permanently delete your account!</Text>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
