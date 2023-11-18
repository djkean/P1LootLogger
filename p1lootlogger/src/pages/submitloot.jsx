import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles";
import { getToken } from "../shared/getToken";

export function SubmitLootPage() {
  const [allItems, setAllItems] = useState([]);
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const getItemRes = await fetch("/api/test", { headers: { "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json" } }, { method: "GET" })
      if (getItemRes.status !== 200) {
        console.log("not 200")
      }
      const getItemResJson = await getItemRes.json();
      console.log(getItemRes)
      setAllItems(getItemResJson.response)
      return getItemResJson.response
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getItems()
  }, []);

  if (allItems?.length === 0) return <h2>Waiting on Response</h2>

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Heading fontSize={"3xl"} py={3}>Loot Submission</Heading>
        <Stack sx={LoginBox} as={"form"} paddingTop={"2em"}>
          <FormControl id="submit--loot" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Submit your Loot</FormLabel>
            <Text sx={FormContext}>Insert loot here or Something:</Text>
            <Input type="text" sx={InputFieldColors} id="loot--submission" name="loot" />
            <Stack>
              <Checkbox size={"lg"} colorScheme={"yellow"} iconColor={"#2A2823"} paddingTop={"0.6em"}>
                Rare Buff Active
              </Checkbox>
              <Checkbox size={"lg"} colorScheme={"yellow"} iconColor={"#2A2823"} paddingBottom={"0.3em"}>
                Received Special Drop
              </Checkbox>
            </Stack>
            <Center>
              <Input type="submit" sx={FormButton} value="Submit"/>
            </Center>
          </FormControl>
        </Stack>
      </Stack>
    </Flex>
  )
}