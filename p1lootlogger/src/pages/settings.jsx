import { React, useState } from "react";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, FormWarning, InputFieldColors, LoginFlex, LoginStack, ResFeedback, SettingsBox } from "../components/pagestyles"; 
import { checkUsernameRegex, checkPasswordRegex, deleteAccountRegex } from "../components/regexChecks";
import axios from "axios";
import { getToken } from "../shared/getToken";
import { useNavigate } from "react-router-dom"; 

export function SettingsPage({loggedIn, setLoggedIn}) {
  const [newUsername, setNewUsername] = useState({ username: "", })
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  })
  const [deleteAccount, setDeleteAccount] = useState({ delAccount: "", })

  const [usernameError, setUsernameError] = useState({})
  const [passwordError, setPasswordError] = useState({})
  const [deleteError, setDeleteError] = useState({})
  const [backendRes, setBackendRes] = useState({})

  const changeUsername = (event) => {
    setNewUsername(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const changePassword = (event) => {
    setNewPassword(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const deleteAccountField = (event) => {
    setDeleteAccount(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const submitUsername = (event) => {
    event.preventDefault();
    setUsernameError(checkUsernameRegex(newUsername))
    let error = checkUsernameRegex(newUsername)
    setUsernameError(error)
    console.log(error.username)
    if (error.username === "") {
      axios.post("/changeusername", newUsername, 
    { headers: { "Authorization": `Bearer ${getToken()}`, 
    "Content-Type": "application/json" } })
      .then(res => {
        console.log("NAME CHANGE OK (AXIOS)", res.data)
        setBackendRes(res.data)
        console.log(backendRes, newUsername)
      })
      .catch(err => {
        console.log("ERROR CHANGING USERNAME (AXIOS)", err.response.data)
        setBackendRes(err.response.data)
      })
    console.log(newUsername)
    }
  } 

  const submitPassword = (event) => {
    event.preventDefault();
    setPasswordError(checkPasswordRegex(newPassword))
    let error = checkPasswordRegex(newPassword)
    setPasswordError(error)
    if (error.oldPassword === "" && error.newPassword1 === "" && error.newPassword2 === "") {
      axios.post("/changepassword", newPassword, 
      { headers: { "Authorization": `Bearer ${getToken()}`, 
      "Content-Type": "application/json" } })
      .then(res => { 
        console.log("PASSWORD CHANGE OK (AXIOS)")
        setBackendRes(res.data)
      })
      .catch(err => {
        console.log("ERROR CHANGING PASSWORD (AXIOS)", err)
        setBackendRes(err.response.data)
      })
    }
  }

  const navigate = useNavigate()
  const submitDeleteAccount = (event) => {
    event.preventDefault();
    setDeleteError(deleteAccountRegex(deleteAccount))
    let error = deleteAccountRegex(deleteAccount)
    setDeleteError(error)
    if (error.delAccount === "") {
      axios.post("/deleteaccount", deleteAccount,
      { headers: { "Authorization": `Bearer ${getToken()}`, 
      "Content-Type": "application/json" } })
      .then( res => {
        console.log("DELETE ACCOUNT FIELD OK (AXIOS)")
        setBackendRes(res.data)
        localStorage.removeItem("P1LL_TOKEN")
        setLoggedIn("out")
        navigate("/createaccount")
      })
      .catch(err => {
        console.log("ERROR IN DELETING ACCOUNT (AXIOS)", err)
        setBackendRes(err.response.data)
      })
    }
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>User Settings</Heading>
          {backendRes.message && <Stack align={"center"} sx={ResFeedback}>
            <Text color={backendRes.code}>{backendRes.message}</Text>
          </Stack>}
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
                {passwordError.oldPassword && <Text>{passwordError.oldPassword}</Text>}
                <Text sx={FormContext}>Type your new Password: </Text>
                <Input type="password" sx={InputFieldColors} id="newPassword1" name="newPassword1" onChange={changePassword}/>
                {passwordError.newPassword1 && <Text>{passwordError.newPassword1}</Text>}
                <Text sx={FormContext}>Re-type your new Password: </Text>
                <Input type="password" sx={InputFieldColors} id="newPassword2" name="newPassword2" onChange={changePassword}/>
                {passwordError.newPassword2 && <Text>{passwordError.newPassword2}</Text>}
                <Center>
                  <Input type="submit" sx={FormButton} value="Change Password"/>
                </Center>
              </FormControl>
            </Stack>
            <Stack as="form" paddingTop={"2em"} onSubmit={submitDeleteAccount}>
              <FormControl id="delete--account" sx={FormControlColors}>
                <FormLabel color={"#FDCA40"}>Delete Account:</FormLabel>
                <Text sx={FormContext}>Re-type your Password to confirm:</Text>
                <Input type="password" sx={InputFieldColors} id="delAccount" name="delAccount" onChange={deleteAccountField}/>
                {deleteError.delAccount && <Text>{deleteError.delAccount}</Text>}
                <Center>
                  <Input type="submit" sx={FormButton} value="Delete my Account"/>
                </Center>
                <Text align={"center"} sx={FormWarning}>This will permanently delete your account!</Text>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
