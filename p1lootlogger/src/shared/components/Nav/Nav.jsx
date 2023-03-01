import { Box, Flex, Text, Button, Spacer, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export function Nav() {

  const navStyles = {
    w: "9em",
    h: "3em",

  }

  const navButtonStyles = {
    //w: "7em",
    //h: "3em",
  }

  return ( <Flex as="nav" bg="gray.200" wrap="wrap" gap="2" p="0.3em">
    <Box sx={navStyles} bg="green.300"><Link to="/home">Home</Link></Box>
    <Box sx={navStyles} bg="green.300"><Link to="/tables">Tables</Link></Box>
    <Box sx={navStyles} bg="pink.300"><Link to="/itemTableResults">Items</Link></Box>
    <Spacer />
    <HStack>
      <Box sx={navButtonStyles}><Button colorScheme="yellow">Sign Up</Button></Box>
      <Box sx={navButtonStyles}><Button colorScheme="yellow">Log In</Button></Box>
      <Box sx={navButtonStyles}><Button colorScheme="purple">Username</Button></Box>
      <Box sx={navButtonStyles}><Button colorScheme="purple">Log Out</Button></Box>
    </HStack>

  </Flex>
  )
}
