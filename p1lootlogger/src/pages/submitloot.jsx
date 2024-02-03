import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Checkbox, Container, Flex, FormControl, FormLabel, Heading, Input, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stack, Text } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, InputFieldColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles";
import { getToken } from "../shared/getToken";
import { Select } from "chakra-react-select";

export function SubmitLootPage() {
  const [allItems, setAllItems] = useState([]);
  const [allBosses, setAllBosses] = useState([])
  const [formData, setFormData] = useState({
    boss: "",
    level: "",
    buffActive: "",
    loot1: "",
    loot2: "",
    loot3: "",
    loot4: "",
    loot5: "",
    money: "",
    boxes: "",
    gold: "",
    specialLoot: "",
    difficulty: "",

  })

  const handleFields = (event) => {
    setFormData(_ => ({..._, [event.target.name]: event.target.value}))
  }

  const navigate = useNavigate();

  const getItemsAndBosses = async () => {
    try {
      const [items, bosses] = await Promise.all([
        fetch("/api/test", { 
          headers: { 
            "Authorization": `Bearer ${getToken()}`, 
            "Content-Type": "application/json" 
          }
        }, { method: "GET" }),
        fetch("/api/boss", { 
          headers: { 
            "Authorization": `Bearer ${getToken()}`, 
            "Content-Type": "application/json" 
           }
        }, { method: "GET" })
      ])
      if (items.status !== 200) {
        return console.log("item query failed")
      }
      else if (bosses.status !== 200) {
        return console.log("boss query failed")
      }
      const itemsJson = await items.json()
      const bossesJson = await bosses.json()
      console.log(items, bosses)
      const itemValues = itemsJson.response
      const bossValues = bossesJson.response
      itemValues.map(item => {
        item.value = item.name
        item.label = item.name
      })
      setAllItems(itemValues)
      setAllBosses(bossValues)
      return (itemValues, bossValues)
    }
    catch(err) {
      console.log(err)
    }
  }

   /* const getItems = async () => {
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
  } */

  useEffect(() => {
    getItemsAndBosses()
  }, []);

  /* All fields that need to be filled by this form + headers + token
  - Report ID - Auto incrementing
  - Boss ID - user input - dropdown of names and name value is converted to ID
  - User ID - Token Payload
  - Trainer level - user input
  - Submitted - Timestamp handled by backend request
  - Buff - user input - checkmark
  - Loot1 through 5 - user input - dropdown and hopefully search bar
  - Money - user input - field number
  - Boxes - user input - dropdown of 0-5? or jusr field number
  - Gold - user input - field number
  - Special - user input - checkmark
  - Difficulty - user input - dropdown only if boss with difficulty settings is chosen preferably
  */

  if (allItems?.length === 0 || allBosses?.length === 0) return <h2>Waiting on Response</h2>
  console.log(allItems, allBosses)
  return (
    <>
      <Flex sx={LoginFlex} align={"center"}>
        <Stack sx={LoginStack} spacing={6} align={"center"}>
          <Heading fontSize={"3xl"} py={3}>Loot Submission</Heading>
          <Stack sx={LoginBox} as={"form"} paddingTop={"2em"}>
            <FormControl id="submit--loot" sx={FormControlColors}>
              <FormLabel color={"#FDCA40"}>Submit your Loot</FormLabel>
              <Text sx={FormContext}>Insert loot here or Something:</Text>
              <Input type="text" sx={InputFieldColors} id="loot--1" name="loot1" />
              <Input type="text" sx={InputFieldColors} id="loot--2" name="loot2" />
              <Input type="text" sx={InputFieldColors} id="loot--3" name="loot3" />
              <Input type="text" sx={InputFieldColors} id="loot--4" name="loot4" />
              <Input type="text" sx={InputFieldColors} id="loot--5" name="loot5" />
              <Stack flexDirection={"row"}>
                <Input type="number" my={2} name="boxes--field" placeholder="Boxes" onChange={handleFields}/>
                <Input type="number" name="gold--field" placeholder="Gold" onChange={handleFields}/>
                <Input type="number" name="money--field" placeholder="Money" onChange={handleFields}/>
              </Stack>
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