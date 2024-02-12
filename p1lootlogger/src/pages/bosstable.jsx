import { Box, Center, Container, Heading, HStack, SimpleGrid, Text} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { GridRowUI, ListGridUI } from "../components/pagestyles";
import { getToken } from "../shared/getToken";
import { Link, useNavigate } from "react-router-dom";

export const BossTable = () => {
  const [bossTableValues, setBossTableValues] = useState([]);

  const navigate = useNavigate()
  const getBossesFromDb = async () => {
    try {
      const bossDbResponse = await fetch("/api/boss", { headers: {
        "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json"
      } }, { method: "GET" })
      if (bossDbResponse.status !== 200) {
        console.log("You need to log in")
        navigate("/login")
      }
      const bossDbResponseJson = await bossDbResponse.json();
      setBossTableValues(bossDbResponseJson.response)
      return bossDbResponseJson.response
    }
    catch(err) {
      console.log(err, "Something went wrong")
    }
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
        <Heading my="0.5em" p="0.75em">All Bosses</Heading>
      </Center>
      <Center>
        <Text>A list of all bosses/dailies found in PokeOne</Text>
      </Center>
      {bossTableValues.length > 0 && bossTableValues.map((boss) => {
        return (
          <SimpleGrid key={boss.ID} sx={ListGridUI}>
            <Center>
              <HStack>
                <Box sx={GridRowUI} w="6em">Boss Image</Box>
                <Box sx={GridRowUI} w="8em">
                  <Link to="/bossdetails">{boss.bossName}</Link>
                </Box>
                <Box sx={GridRowUI} w="25em" mr="2em">
                  <Link to={"/bossdata/" + boss.ID}>{boss?.region} - {boss?.location}</Link>
                </Box>
              </HStack>
            </Center>
          </SimpleGrid>
        )
      })}
    </Container>
  </div>);
};