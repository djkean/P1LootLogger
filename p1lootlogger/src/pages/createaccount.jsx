import React from "react";
import { Box, Container, Heading, SimpleGrid, Text, Center, HStack, Input} from "@chakra-ui/react";

export function CreateAccountPage() {

  const inputStyles = {
    border: "1px solid black"
  }

  return ( 
  <div> 
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="0.5em" p="0.75em">
          Create an Account
        </Heading>
      </Center>
      <Center>
        <Text>
          To make an account, fill out the fields below:
        </Text>
      </Center>
      <Center>
        <Box>
          <Text>Username:</Text>
          <Input sx={inputStyles}></Input>
          <Text>Email Address:</Text>
          <Input sx={inputStyles}></Input>
          <Text>Confirm Email Address:</Text>
          <Input sx={inputStyles}></Input>
          <Text>Password:</Text>
          <Input sx={inputStyles} type="password"></Input>
          <Text>Confirm Password:</Text>
          <Input sx={inputStyles} type="password"></Input>
        </Box>
      </Center>
    </Container>
  </div>
  )
}