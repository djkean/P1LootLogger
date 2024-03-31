import { Box, Flex, Button, Spacer, HStack, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "../Chevron";
import { NavButton, MenuStyles, TitleTheme } from "../../../components/pagestyles";

export function Nav({loggedIn, setLoggedIn}) {

  const navLogout = () => {
    setLoggedIn("out")
    localStorage.removeItem("P1LL_TOKEN")
  }

  return ( 
    <Flex as="nav" bg="#2D2E2E" wrap="wrap" gap="2" p="0.3em">
      <Box><Button sx={NavButton}><Link to="/home">Home</Link></Button></Box>
      <Box>
        <Menu>
          <MenuButton as={Button} sx={NavButton}>
            <Flex wrap="wrap">Tables<ChevronDown /></Flex>
          </MenuButton>
          <MenuList bg="#5D5D5D" border="1px solid black">
            <Link to="/itemtable">
              <MenuItem sx={MenuStyles}>Items</MenuItem>
            </Link>
            <Link to="/bosstable">
              <MenuItem sx={MenuStyles}>Bosses</MenuItem>
            </Link>
            <Link to="/submitloot">
              <MenuItem sx={MenuStyles}>Submit Loot</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Box>
      <Spacer/>
      <Box fontSize={"2xl"}>
        <Text sx={TitleTheme}>
          PokeOne LootLogger
        </Text>
      </Box>
      <Spacer/>
      <HStack align={"right"}>
        {loggedIn === "out" && <>
          <Box>
            <Link to="/createaccount">
              <Button sx={NavButton}>Create Account</Button>
            </Link>
          </Box>
          <Box>
            <Link to="/login">
              <Button sx={NavButton}>Log In</Button>
            </Link>
          </Box>
        </>}
        {loggedIn === "in" && 
        <>
          <Box>
            <Link to="/settings">
              <Button sx={NavButton}>Settings</Button>
            </Link>
          </Box>
          <Box>
            <Button sx={NavButton} onClick={navLogout}>Log Out</Button>
          </Box>
        </>
       }
      </HStack>
    </Flex>
  )
}
