import React from "react";
import { Box, Container, Heading, Text, Center, Input, Button} from "@chakra-ui/react";
import { ButtonStyles, inputStyles } from "../components/pagestyles"

export function CreateAccountPage() {

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
        <Box>
          <Text>Username:</Text>
          <Input sx={inputStyles} type="text"/>
          <Text>Email Address:</Text>
          <Input sx={inputStyles} type="text"/>
          <Text>Confirm Email Address:</Text>
          <Input sx={inputStyles} type="text"/>
          <Text>Password:</Text>
          <Input sx={inputStyles} type="password" placeholder="password"/>
          <Text>Confirm Password:</Text>
          <Input sx={inputStyles} type="password" placeholder="password"/>
          <Button sx={ButtonStyles} my="1em">Register</Button>
        </Box>
      </Center>
    </Container>
  </div>
  )
}