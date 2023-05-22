import { Box, Container, Heading, SimpleGrid, Text, Center, HStack} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { itemTableStyles, itemGridStyles, parentItemGridStyles } from "../components/pagestyles";

export const BossInfo = () => {
  const [bossInfoValues, setBossInfoValues] = useState([]);

  const getBossInfoFromDb = async () => {
    const bossInfoDbResponse = await fetch("/api/bossinfo", {method: "GET" })
    const bossInfoDbResponseJson = await bossInfoDbResponse.json();
    setBossInfoValues(bossInfoDbResponseJson.response)
    return bossInfoDbResponseJson.response
  }

  useEffect(() => {
    console.log()
    getBossInfoFromDb()
  }, []);

  if (bossInfoValues.length === 0) return <h2>fetching Boss Info...</h2>

  bossInfoValues.map((bossData) => console.log(bossData.teamData))

  return (
    <div>
      <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
        <Center>
          <Heading my="0.5em" p="0.75em">(boss name here) - Details</Heading>
        </Center>
        <Center>
          <Text>In-depth information about (boss name here)</Text>
        </Center>
         {bossInfoValues.length > 0 && bossInfoValues.map((info) => {
          return (
            <SimpleGrid key={info.ID} sx={parentItemGridStyles}>
              <Center>
                <HStack>
                  <Box sx={itemGridStyles} w="6em">Boss Image</Box>
                  <Box sx={itemGridStyles} w="8em">{info.bossName}</Box>
                  <Box sx={itemGridStyles} w="25em" mr="2em">{info?.teamData[1]?.Pokemon}</Box>
                </HStack>
              </Center>
            </SimpleGrid>
          )
         })}
      </Container>
    </div>
  )
}
//{info.teamData[1].Pokemon}