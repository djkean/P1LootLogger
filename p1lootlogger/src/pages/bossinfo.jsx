import {Container, Heading, Text, Center} from "@chakra-ui/react";
import React from "react";

export const bossInfoPage = () => {
  return (
    <div>
      <Container as="section" maxW="100hv" mawH="100hv" bg="#5D5D5D" pb="2em">
        <Center>
          <Heading my="0.5em" p="0.75em">(boss name here) - Details</Heading>
        </Center>
        <Center>
          <Text>In-depth information about (boss name here)</Text>
        </Center>
      </Container>
    </div>
  )
}