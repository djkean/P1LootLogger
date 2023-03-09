import { Box, Flex, Button, Spacer, HStack, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "../Chevron";
import { ButtonStyles, ButtonStyles2, MenuStyles } from "../../../components/pagestyles";

export function Nav() {

  return ( 
  <Flex as="nav" bg="#2D2E2E" wrap="wrap" gap="2" p="0.3em">
    <Box><Button sx={ButtonStyles}><Link to="/home">Home</Link></Button></Box>
    <Box><Menu>
      <MenuButton as={Button} sx={ButtonStyles}>
        <Flex wrap="wrap">Tables <ChevronDown /></Flex>
      </MenuButton>
      <MenuList bg="#5D5D5D" border="1px solid black">
        <MenuItem sx={MenuStyles}><Link to="/itemtable">Items</Link></MenuItem>
        <MenuItem sx={MenuStyles}><Link to="/bosstable">Bosses</Link></MenuItem>
      </MenuList>
    </Menu></Box>
    <Spacer /> 
    <HStack>
      <Box><Button sx={ButtonStyles}><Link to="/createaccount">Create Account</Link></Button></Box>
      <Box><Button sx={ButtonStyles}>Log In</Button></Box>
      <Box><Button sx={ButtonStyles2}>Username</Button></Box>
      <Box><Button sx={ButtonStyles2}>Log Out</Button></Box>
    </HStack>
  </Flex>
  )
}
