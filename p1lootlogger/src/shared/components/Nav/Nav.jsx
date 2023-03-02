import { Box, Flex, Text, Button, Spacer, HStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export function Nav() {

  const ButtonStyles = {
    boxShadow: "sm",
    color: "#262626",
    bg: "#FDCA40",
    ':hover': {
      bg: "#F2A202",
    }
  }

  const ButtonStyles2 = {
    boxShadow: "sm",
    color: "#262626",
    bg: "#DD380F",
    ':hover': {
      bg: "#B12805",
    }
  }

  return ( 
  <Flex as="nav" bg="#2D2E2E" wrap="wrap" gap="2" p="0.3em">
    <Box><Button sx={ButtonStyles}><Link to="/home">Home</Link></Button></Box>
    <Box><Button sx={ButtonStyles}><Link to="/tables">Tables</Link></Button></Box>
    <Box><Button sx={ButtonStyles}><Link to="/itemtable">Items</Link></Button></Box>
    <Spacer />
    <HStack>
      <Box><Button sx={ButtonStyles}>Sign Up</Button></Box>
      <Box><Button sx={ButtonStyles}>Log In</Button></Box>
      <Box><Button sx={ButtonStyles2}>Username</Button></Box>
      <Box><Button sx={ButtonStyles2}>Log Out</Button></Box>
    </HStack>
  </Flex>
  )
}
