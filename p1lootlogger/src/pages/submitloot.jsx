import { React, useState } from "react";
import { Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles";

export function SubmitLootPage() {

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Heading fontSize={"3xl"} py={3}>Loot Submission</Heading>
        <Stack sx={LoginBox} as={"form"} paddingTop={"2em"}>
          <FormControl id="submit--loot" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Submit your Loot</FormLabel>
            <Text sx={FormContext}>Insert loot here or Something:</Text>
            <Input type="text" sx={InputFieldColors} id="loot--submission" name="loot" />
            <Center>
              <Input type="submit" sx={FormButton} value="Submit"/>
            </Center>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  )
}