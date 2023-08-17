import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Center, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles"
import { regVerification } from "../components/regVerification";
import axios from "axios";

export function CreateAccountPage() {
  const [regDetails, setRegDetails] = useState({
    username: "",
    email: "",
    password: "",
  })
  
  const [regError, setRegError] = useState({})

  const handleFields = (event) => {
    setRegDetails(_ => ({..._, [event.target.name]: [event.target.value]}))
  }

  const navigate = useNavigate();
  const submitFields = (event) => {
    event.preventDefault();
    //setRegError(regVerification(regDetails))
    let error = regVerification(regDetails)
    setRegError(error)
    console.log(regDetails)
    console.log(error.username, error.email, error.password)
    if (error.username === "" && error.email === "" && error.password === "") {
      console.log("123")
      axios.post("http://localhost:8080/createaccount", regDetails)
      .then((res => navigate("/login")))
      .catch((err => console.log(err)))
    }
  }

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} py={3}>Create Account</Heading>
          <Text fontSize={"lg"}>Already have an account? Log in {" "}
            <Link to="/createaccount" color="#FDCA40">here</Link>
          </Text>
        </Stack>
        <Box sx={LoginBox} as="form" id="reg--form" onSubmit={submitFields}>
          <Stack spacing={3}>
            <FormControl id="username" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Username:</FormLabel>
              <Input type="username" sx={InputFieldColors}
              id="reg--username" name="username" onChange={handleFields}/>
              {regError.username && <Text>{regError.username}</Text>}
            </FormControl>
            <FormControl id="email" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Email:</FormLabel>
              <Input type="email" sx={InputFieldColors}
              id="reg--email--1" name="email" onChange={handleFields}/>
              {regError.email && <Text>{regError.email}</Text>}
            </FormControl>
            <FormControl id="password" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Password:</FormLabel>
              <Input type="password" sx={InputFieldColors}
              id="reg--password--1" name="password" onChange={handleFields}/>
              {regError.password && <Text>{regError.password}</Text>}
              <Center>
                <Button sx={FormButton}>Create Account</Button>
              </Center>
              <Text color={"#BFA55C"} align={"center"}></Text>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
