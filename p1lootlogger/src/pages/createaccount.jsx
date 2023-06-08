import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Stack, Box, Container, Heading, Link, Text, Center, Input, Button, FormControl, FormLabel} from "@chakra-ui/react";
import { ButtonStyles, inputStyles, LoginFlex, LoginStack, LoginBox,FormButton, InputFieldColors, FormControlColors } from "../components/pagestyles"
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
            </FormControl>
            <Button sx={FormButton}>Create Account</Button>
            <Text color={"#BFA55C"} align={"center"}></Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>

  )

  /* return (
  <div> 
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="1em" p="0.75em">Create an Account</Heading>
      </Center>
      <Center>
        <Text my="1em">To make an account, fill out the fields below:</Text>
      </Center>
      <Center>
        <Text my="1em">Already have an account? Log in </Text> {' '}
          <Link to="/login" color="#FDCA40"> here.</Link> {' '}
      </Center>
      <Center>
        <Box as="form" id="reg--form" onSubmit={submitFields}>
          <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input sx={inputStyles} type="text" id="reg--username" name="username" onChange={handleFields}/>
            {regError.username && <Text>{regError.username}</Text>}
            <FormLabel>Email Address:</FormLabel>
            <Input sx={inputStyles} type="email" id="reg--email--1" name="email" onChange={handleFields}/>
            {regError.email && <Text>{regError.email}</Text>}
            <FormLabel>Password:</FormLabel>
            <Input sx={inputStyles} type="password" id="reg--password--1" placeholder="password" name="password" onChange={handleFields}/>
            {regError.password && <Text>{regError.password}</Text>}
            <Button sx={ButtonStyles} my="1em" type="submit">Register</Button>
          </FormControl>
        </Box>
      </Center>
    </Container>
  </div>
  ) */
}

/* <FormLabel>Confirm Email Address:</FormLabel>
  <Input sx={inputStyles} type="email" id="reg--email--2"/>
  <FormLabel>Confirm Password:</FormLabel>
  <Input sx={inputStyles} type="password" id="reg--password--2" placeholder="password"/> */