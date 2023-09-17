import { Box, Flex, Button, Spacer, HStack, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "../Chevron";
import { AccountButton, NavButton, MenuStyles } from "../../../components/pagestyles";

export function Nav() {

  return ( 
  <Flex as="nav" bg="#2D2E2E" wrap="wrap" gap="2" p="0.3em">
    <Box><Button sx={NavButton}><Link to="/home">Home</Link></Button></Box>
    <Box>
      <Menu>
        <MenuButton as={Button} sx={NavButton}>
          <Flex wrap="wrap">Tables <ChevronDown /></Flex>
        </MenuButton>
        <MenuList bg="#5D5D5D" border="1px solid black">
          <Link to="/itemtable">
            <MenuItem sx={MenuStyles}>Items</MenuItem>
          </Link>
          <Link to="/bosstable">
            <MenuItem sx={MenuStyles}>Bosses</MenuItem>
          </Link>
          <Link to="/bossinfo">
            <MenuItem sx={MenuStyles}>Boss Info</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
    <Spacer /> 
    <HStack>
      <Box>
        <Link to="/createaccount">
          <Button sx={NavButton}>Create Account</Button>
        </Link>
      </Box>
      <Box>
        <Link to="/login"><Button sx={NavButton}>Log In</Button>
        </Link>
      </Box>
      <Box>
        <Button sx={AccountButton}>Username</Button>
        </Box>
      <Box>
        <Button sx={AccountButton}>Log Out</Button>
      </Box>
    </HStack>
  </Flex>
  )
}
