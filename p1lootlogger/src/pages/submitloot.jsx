import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Checkbox, Code, Container, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles";
import { getToken } from "../shared/getToken";
import { Select, CreateableSelect, AsyncSelect } from "chakra-react-select";

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
      const items = getItemResJson.response
      items.map(item => {
        item.value = item.name
        item.label = item.name
      })
      setAllItems(items)
      return items
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getItems()
  }, []);

  if (allItems?.length === 0) return <h2>Waiting on Response</h2>
  console.log(allItems)
  return (
    <>
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
            <Container>
              <FormControl>
                <FormLabel>Drop down search multi</FormLabel>
                <Text>Select up to 5 drops to submit</Text>
                <Select
                  options={allItems}
                  placeholder="select up to five items..."
                  closeMenuOnSelect={false}
                  selectedOptionStyle="check"
                  hideSelectedOptions={false}
                  isMulti
                />
              </FormControl>
            </Container>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

//set up custom component to display images for the selected items about the select form