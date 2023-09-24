import { React } from "react";
import { Box, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles"; 

export function SettingsPage() {
  return (
    <Flex sx={LoginFlex}>
      <Stack sx={LoginStack} align={"center"}>
        <Heading>User Settings</Heading>
        <Text>Here you can adjust settings for your account</Text>
      </Stack>
      <Box sx={LoginBox} as="form" id="settings-form">
        <Stack spacing={3}>
          <FormControl id="delete-account" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Delete Account</FormLabel>
            <Checkbox sx={InputFieldColors} type="radio" id="confirm--del--acc" name="delete--account">
            </Checkbox>
          </FormControl>
        </Stack>
      </Box>
    </Flex>
  )
}
