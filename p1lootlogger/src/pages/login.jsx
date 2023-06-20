import { Avatar, Badge, Box, Button, Center, Checkbox, Container, FormControl, FormLabel, Flex, 
  Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { ButtonStyles, inputStyles, LoginStack, LoginBox, LoginFlex, FormControlColors, InputFieldColors, FormButton } from "../components/pagestyles"
import { React, useState} from "react";
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
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} py={3}>Log In</Heading>
          <Text fontSize={"lg"}>Don't have an account? Create one {" "}
            <Link to="/createaccount" color="#FDCA40">here</Link>
          </Text>
        </Stack>
        <Box sx={LoginBox} as="form" id="login--form" onSubmit={submitFields}>
          <Stack spacing={3}>
            <FormControl id="email" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Email:</FormLabel>
              <Input type="email" sx={InputFieldColors}
              id="ver--email" name="email" onChange={handleFields}/>
              {loginError.email && <Text>{loginError.email}</Text>}
            </FormControl>
            <FormControl id="password" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Password:</FormLabel>
              <Input type="password" sx={InputFieldColors}
              id="ver--password" name="password" onChange={handleFields}/>
              {loginError.password && <Text>{loginError.password}</Text>}
              <Button sx={FormButton}> Sign in</Button>
            <Text color={"#BFA55C"} align={"center"}>Forgot Password? Click here</Text>
            </FormControl>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  ) 
}

        /*  <Text my="1em">Need an account? You can create one </Text>
        <Text color="#FDCA40"><Link to="/createaccount"> here.</Link></Text> */

        /*  
        
        <div> 
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="1em" p="0.75em">Log In</Heading>
      </Center>
      <Center>
        <Text my="1em">Log in by filling the fields below:</Text>
      </Center>
      <Center>
      <Text my="1em">Need an account? You can create one {' '}
      <Link to="/createaccount" color="#FDCA40">here.</Link> {' '}
        </Text>   
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
        
        
        */