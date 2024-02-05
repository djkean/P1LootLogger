import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Center, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, Select } from "@chakra-ui/react";
import { FormButton, FormContext, FormControlColors, LoginBox, LoginFlex, LoginStack } from "../components/pagestyles";
import { getToken } from "../shared/getToken";
import axios from "axios"

export function SubmitLootPage() {
  const [allItems, setAllItems] = useState([]);
  const [allBosses, setAllBosses] = useState([]);
  const [serverRes, setServerRes] = useState({});
  const [formData, setFormData] = useState({
    boss: null,
    level: null,
    buffActive: 0,
    loot1: null,
    loot2: null,
    loot3: null,
    loot4: null,
    loot5: null,
    money: null,
    boxes: null,
    gold: null,
  });

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

  const handleFields = (event) => {
    setFormData(_ => ({..._, [event.target.name]: event.target.value}))
    console.log(formData)
  }

  const handleLootFields = (event) => {
    setFormData(_ => ({..._, [event.target.name]: event.target.children[event.target.selectedIndex].getAttribute("id")}))
    console.log(`Latest change: ${event.target.children[event.target.selectedIndex].getAttribute("id")}`)
    console.log(`Boss ID: ${formData.boss}`)
    console.log(`Item IDs: 1: ${formData.loot1}, 2: ${formData.loot2}, 3: ${formData.loot3}, 4: ${formData.loot4}, 5: ${formData.loot5}, `)
  }

  const toggleCheckbox = (event) => {
    if (formData.buffActive === 0) {
      setFormData(_ => ({..._, buffActive: 1}))
      console.log("buff active set to yes")
    }
    else if (formData.buffActive === 1) {
      setFormData(_ => ({..._, buffActive: 0}))
      console.log("buffactive set to no")
    }
    console.log(`buffactive set to ${formData.buffActive} <--- this is a liar`)
  }

  const submitFormData = async (event) => {
    event.preventDefault()
    console.log(formData)
    axios.post("http://localhost:8080/submitloot", formData)
    .then(res => {
      console.log(res)
      console.log("SUCCESS (AXIOS)")
      setServerRes(res.data)
    })
    .catch(err => {
      setServerRes(err)
      console.log("SOMETHING BAD HAPPENED", err)
      console.log(formData)
    })
  }

  useEffect(() => {
    getItemsAndBosses()
  }, []);

  if (allItems?.length === 0 || allBosses?.length === 0) return <h2>Waiting on Response</h2>

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} spacing={6} align={"center"}>
        <Heading fontSize={"3xl"} py={3}>Loot Submission</Heading>
        <Stack sx={LoginBox} as={"form"} paddingTop={"2em"} onSubmit={submitFormData}>
          <FormControl id="submit--loot" sx={FormControlColors}>
            <FormLabel color={"#FDCA40"}>Submit your Loot</FormLabel>
            <Text sx={FormContext}>Insert loot here or Something:</Text>
            <Select placeholder="Boss" name="boss" my={3} isRequired onChange={handleLootFields}>
              {allBosses.map(boss => {
                return (<option key={boss?.ID} id={boss?.ID}>{boss?.bossName}</option>)
              })}
            </Select>
            <Select placeholder="Select your drops" name="loot1" my={3} isRequired onChange={handleLootFields}>
              {allItems.map(item => {
                return (<option key={item?.id} id={item?.id}>{item?.name}</option>)
              })}
            </Select>
            <Select placeholder="Select your drops" name="loot2" my={3} onChange={handleLootFields}>
              {allItems.map(item => {
                return (<option key={item?.id} id={item?.id}>{item?.name}</option>)
              })}
            </Select>
            <Select placeholder="Select your drops" name="loot3" my={3} onChange={handleLootFields}>
              {allItems.map(item => {
                return (<option key={item?.id} id={item?.id}>{item?.name}</option>)
              })}
            </Select>
            <Select placeholder="Select your drops" name="loot4" my={3} onChange={handleLootFields}>
              {allItems.map(item => {
                return (<option key={item?.id} id={item?.id}>{item?.name}</option>)
              })}
            </Select>
            <Select placeholder="Select your drops" name="loot5" my={3} onChange={handleLootFields}>
              {allItems.map(item => {
                return (<option key={item?.id} id={item?.id} name="loot5">{item?.name}</option>)
              })}
            </Select>
            <Stack flexDirection={"row"}>
              <Input type="number" my={2} name="boxes" placeholder="Boxes" isRequired onChange={handleFields}/>
              <Input type="number" name="gold" placeholder="Gold" isRequired onChange={handleFields}/>
              <Input type="number" name="money" placeholder="Money" isRequired onChange={handleFields}/>
              <Input type="number" name="level" placeholder="Level" isRequired onChange={handleFields}/>
            </Stack>
            <Stack>
              <Checkbox size={"lg"} colorScheme={"yellow"} iconColor={"#2A2823"} paddingTop={"0.6em"} onChange={toggleCheckbox}>
                Rare Buff Active
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

//set up custom component to display images for the selected items about the select form

/* <Select
                  options={allItems}
                  placeholder="select up to five items..."
                  closeMenuOnSelect={false}
                  selectedOptionStyle="check"
                  hideSelectedOptions={false}
                  isMulti
                /> */