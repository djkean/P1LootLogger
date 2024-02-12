import React, { useState, useEffect } from "react";
import { getToken } from "../shared/getToken";
import { useLocation, useParams } from "react-router-dom"; 
import { Box, Center, Flex, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";

export const BossData = () => {
  const [bossData, setBossData] = useState([]);
  const [bossLoot, setBossLoot] = useState([]);
  const idFromRoute = useParams();
  console.log(idFromRoute)

  const getBossData = async () => {
    try {
      const [info, loot] = await Promise.all([
        fetch("/api/bossdata", {
          headers: { 
            "Authorization": `Bearer ${getToken()}`, 
            "Content-Type": "application/json" 
          }
        }, { method: "GET" }),
        fetch("/api/bossloot", { 
          headers: { 
            "Authorization": `Bearer ${getToken()}`, 
            "Content-Type": "application/json" 
           }
        }, { method: "GET" })
      ])
      if (info.status !== 200) {
        return console.log("info query failed")
      }
      else if (loot.status !== 200) {
        return console.log("loot query failed")
      }
      const infoJson = await info.json()
      const lootJson = await loot.json()
      const infoValues = infoJson.response
      const lootValues = lootJson.response
      setBossData(infoValues)
      setBossLoot(lootValues)
      console.log(infoValues, lootValues)
      return (infoValues, lootValues)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBossData()
  }, []);

  if (bossData?.length === 0 || bossLoot?.length === 0) return <Text>Waiting on server...</Text>

  return (
    <Flex>
      <Stack>
        <Heading></Heading>
        <Stack>

        </Stack>
      </Stack>
    </Flex>
  )

}