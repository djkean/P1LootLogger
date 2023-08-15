import { Box, Center, Container, Heading, HStack, SimpleGrid, Text} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { GridRowUI, ListGridUI } from "../components/pagestyles";

export const BossTable = () => {
const [bossTableValues, setBossTableValues] = useState([]);

const getBossesFromDb = async () => {
  const bossDbResponse = await fetch("/api/boss", { method: "GET" })
  const bossDbResponseJson = await bossDbResponse.json();
  setBossTableValues(bossDbResponseJson.response)
  return bossDbResponseJson.response
}

useEffect(() => { 
  console.log()
  getBossesFromDb()
}, []);

//too many center components, move to regular css for those maybe?
  if (bossTableValues.length === 0) return <h2> Fetching Bosses...</h2>

  return (<div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="0.5em" p="0.75em">All Items</Heading>
      </Center>
      <Center>
        <Text>A list of all bosses/dailies found in PokeOne</Text>
      </Center>
      <Center>
        <Text>If you think any dailies are missing, please let us know!</Text>
      </Center>
      {bossTableValues.length > 0 && bossTableValues.map((boss) => {
        return (
          <SimpleGrid key={boss.bossID} sx={ListGridUI}>
            <Center>
              <HStack>
                <Box sx={GridRowUI} w="6em">Boss Image</Box>
                <Box sx={GridRowUI} w="8em">{boss.bossName}</Box>
                <Box sx={GridRowUI} w="25em" mr="2em">{boss.bossRegion}</Box>
              </HStack>
            </Center>
          </SimpleGrid>
        )
      })}
    </Container>
  </div>);
};