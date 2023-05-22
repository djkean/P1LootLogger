import {Container, Heading, Text, Center} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <Container as="section" maxW="100hv" mawH="100hv" bg="#5D5D5D" pb="2em">
        <Center>
          <Heading my="0.5em" p="0.75em">(boss name here) - Details</Heading>
        </Center>
        <Center>
          <Text>In-depth information about (boss name here)</Text>
        </Center>
        <Center>
          <Text>{bossInfoValues}</Text>
        </Center>
      </Container>
    </div>
  )
}