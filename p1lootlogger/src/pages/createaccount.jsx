import React, {useState} from "react";
import { Box, Container, Heading, Text, Center, Input, Button, FormControl, FormLabel} from "@chakra-ui/react";
import { ButtonStyles, inputStyles } from "../components/pagestyles"
import { Link } from "react-router-dom"
import { regVerification } from "../components/regVerification";

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

  const submitFields = (event) => {
    event.preventDefault();
    setRegError(regVerification(regDetails))
    console.log(regDetails)
  }

  return (
  <div> 
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="1em" p="0.75em">Create an Account</Heading>
      </Center>
      <Center>
        <Text my="1em">To make an account, fill out the fields below:</Text>
      </Center>
      <Center>
        <Text my="1em">Already have an account? Log in </Text><Text color="#FDCA40">
          <Link to="/login"> here.</Link></Text>
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
  )
}

/* <FormLabel>Confirm Email Address:</FormLabel>
  <Input sx={inputStyles} type="email" id="reg--email--2"/>
  <FormLabel>Confirm Password:</FormLabel>
  <Input sx={inputStyles} type="password" id="reg--password--2" placeholder="password"/> */