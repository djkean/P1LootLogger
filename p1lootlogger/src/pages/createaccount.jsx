import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack, ResCard } from "../components/pagestyles";
import { comparePasswords } from "../components/regexChecks";
import axios from "axios";

export function CreateAccountPage() {
  const [accountFormData, setAccountFormData] = useState({
    username: "",
    email: "",
    firstField: "",
    secondField: "",
  })
  const [formError, setFormError] = useState({})
  const [createAccountRes, setCreateAccountRes] = useState({})
  
  const handleFields = (event) => {
    setAccountFormData(_ => ({..._, [event.target.name]: event.target.value }))
  }
  
  const navigate = useNavigate();
  const submitFormData = async (event) => {
    event.preventDefault();
    let error = comparePasswords(accountFormData.firstField, accountFormData.secondField)
    setFormError(error)
    console.log(error)
    if (error.firstField === "" && error.secondField === "")
    console.log("no errors found, submitting form...")
    await axios.post("/createaccount", accountFormData)
    .then(res => {
      setCreateAccountRes(res.data)
      console.log(res.data.message, res.data.code)
      navigate("/login")
    })
    .catch(err => {
      setCreateAccountRes(err.response.data)
      console.log(err, `Backend returned with error ${err.response.status}`)
    })
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}> 
        <Heading fontSize={"4xl"} py={3}>Create Account</Heading>
        {createAccountRes.error && <Stack sx={ResCard} align={"center"}>
          <Text color={"red"}>{createAccountRes.error} </Text>
        </Stack>}
        {createAccountRes.response && <Stack sx={ResCard} align={"center"}>
          <Text color={"green"}>{createAccountRes.response}</Text>
        </Stack>}
        <Text fontSize={"lg"}>Already have an account? Log in {" "}
          <Link to="/createaccount" color="#FDCA40">here</Link>
        </Text>
        <Stack sx={LoginBox} as="form" spacing={3} onSubmit={submitFormData}>
          <FormControl id="create--account--form" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Username:</FormLabel>
            <Input type="username" sx={InputFieldColors} 
            id="reg--username" name="username" onChange={handleFields}/>
            <FormLabel color={"#FDCA40"}>Email:</FormLabel>
            <Input type="email" sx={InputFieldColors} 
            id="reg--email" name="email" onChange={handleFields}/>
            <FormLabel color={"#FDCA40"}>Password:</FormLabel>
            <Input type="password" sx={InputFieldColors}
            id="reg--password" name="firstField" onChange={handleFields}/>
            {formError.firstField && <Text>{formError.firstField}</Text>}
            <FormLabel color={"#FDCA40"}>Re-type Password:</FormLabel>
            <Input type="password" sx={InputFieldColors}
            id="reg--password2" name="secondField" onChange={handleFields}/>
            {formError.secondField && <Text>{formError.secondField}</Text>}
            <Center>
              <Input type="submit" sx={FormButton} value="Create Account"/>
            </Center>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  )
}