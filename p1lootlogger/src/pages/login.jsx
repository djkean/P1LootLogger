import { Box, Container, Heading, Text, Center, Input, Button, FormControl, FormLabel} from "@chakra-ui/react";
import { ButtonStyles, inputStyles } from "../components/pagestyles"
import { React, useState} from "react";
import { Link } from "react-router-dom"
import { loginVerification } from "../components/loginVerification";

export function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    email: "",
    password: "",
  })
  
  const [loginError, setLoginError] = useState({})

  const handleFields = (event) => {
    setLoginDetails(_ => ({..._, [event.target.name]: [event.target.value]}))
  }

  const submitFields = (event) => {
    event.preventDefault();
    setLoginError(loginVerification(loginDetails))
  }

  return (
  <div> 
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="1em" p="0.75em">Log In</Heading>
      </Center>
      <Center>
        <Text my="1em">Log in by filling the fields below:</Text>
      </Center>
      <Center>
        <Text my="1em">Need an account? You can create one </Text>
        <Text color="#FDCA40"><Link to="/createaccount"> here.</Link></Text>
      </Center>
      <Center>
        <Box as="form" id="login--form" onSubmit={submitFields}>
          <FormControl>
            <FormLabel>Email:</FormLabel>
            <Input sx={inputStyles} type="email" id="ver--email" name="email" onChange={handleFields}/>
            {loginError.email && <Text>{loginError.email}</Text>}
            <FormLabel>Password:</FormLabel>
            <Input sx={inputStyles} type="password" id="ver--password" name="password" onChange={handleFields} placeholder="password"/>
            {loginError.password && <Text>{loginError.password}</Text>}
            <Button sx={ButtonStyles} my="1em" type="submit">Log In</Button>
          </FormControl>
        </Box>
      </Center>
    </Container>
  </div> 
  )
}