import { React } from "react";
import { Box, Center, Flex, FormControl, FormLabel, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles"; 

export function SettingsPage() {
  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6}>
        <Stack align={"center"}>
          <Heading fontSize={"3xl"} py={3}>User Settings</Heading>
        </Stack>
        <Box sx={LoginBox} id="settings--form">
          <Stack spacing={3}>
            <Stack as="form">
            <FormControl id="username" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>
                Change Username:</FormLabel>
                <Text color={"#BFA55C"} align={"left"} py={1}>
                  Enter your new Username
                </Text>
              <Input type="text" sx={InputFieldColors}
              id="change--username" name="username" />
               <Center>
                <Input type="submit" sx={FormButton} value="Change Username"/>
              </Center>
            </FormControl>
            </Stack>
            <Stack as="form">
            <FormControl id="delete--account" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Delete Account:</FormLabel>
              <Text color={"#BFA55C"} align={"left"} py={1}>
                Please re-type your Password to confirm
                </Text>
              <Input type="password" sx={InputFieldColors}
              id="ver--password" name="password"/>
              <Center>
                <Input type="submit" sx={FormButton} value="Delete my Account"/>
              </Center>
            </FormControl>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
