import { React, useState } from "react";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, FormWarning, InputFieldColors, LoginFlex, LoginStack, SettingsBox } from "../components/pagestyles"; 
import { checkUsernameRegex, checkPasswordRegex } from "../components/settingsVerification";

export function SettingsPage() {
  const [newUsername, setNewUsername] = useState({username: "",})
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  })

  const changeUsername = (event) => {
    setNewUsername(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const changePassword = (event) => {
    setNewPassword(_ => ({..._, [event.target.name]: event.target.value}))
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>User Settings</Heading>
        </Stack>
        <Box sx={SettingsBox} id="settings--form">
          <Stack spacing={3}>
            <Stack as="form" id="change--user">
              <FormControl id="username" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Change Username:</FormLabel>
                <Text sx={FormContext}> Enter your new Username: </Text>
                <Input type="text" sx={InputFieldColors} id="change--username" name="username" onChange={changeUsername}/>
                <Center>
                  <Input type="submit" sx={FormButton} value="Change Username"/>
                </Center>
              </FormControl>
            </Stack>
            <Stack as="form" paddingTop={"2em"}>
              <FormControl id="change--password" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Change Password:</FormLabel>
                <Text sx={FormContext}>Type your current Password:</Text>
                <Input type="password" sx={InputFieldColors} id="oldPassword" name="oldPassword"/>
                <Text sx={FormContext}>Type your new Password: </Text>
                <Input type="password" sx={InputFieldColors} id="newPassword1" name="newPassword1"/>
                <Text sx={FormContext}>Re-type your new Password: </Text>
                <Input type="password" sx={InputFieldColors} id="newPassword2" name="newPassword2"/>
                <Center>
                  <Input type="submit" sx={FormButton} value="Change Password"/>
                </Center>
              </FormControl>
            </Stack>
            <Stack as="form" paddingTop={"2em"}>
              <FormControl id="delete--account" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Delete Account:</FormLabel>
                <Text sx={FormContext}>Re-type your Password to confirm:</Text>
                <Input type="password" sx={InputFieldColors} id="delete--account" name="delete--acount"/>
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
