import React, { useState, useEffect } from "react";
import { getToken } from "../shared/getToken";
import { useLocation, useParams } from "react-router-dom"; 
import { Box, Center, Flex, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";
import { LoginBox, LoginFlex, LoginStack, ResCard } from "../components/pagestyles";

export const BossData = () => {
  const [bossData, setBossData] = useState();

  const idFromRoute = useParams();
  console.log(idFromRoute)
  const bossID = idFromRoute.id
  console.log(bossID)

  const getBossData = async () => {
    try {
      const bossAndLootData = await fetch("/api/bossdata", {
        headers: { 
          "Authorization": `Bearer ${getToken()}`, 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ bossID: bossID })
      })
      if (bossAndLootData.status !== 200) {
        return console.log("info query failed")
      }
      const bossDataJson = await bossAndLootData.json()
      const bossDataValues = bossDataJson.response
      console.log(bossDataValues)
      setBossData(bossDataValues)
      return (bossDataValues)
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBossData()
  }, []);

  if (bossData?.length === 0) return <Text>Waiting on server...</Text>
  console.log(bossData)
  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} align={"center"}>
        <Heading fontSize={"3xl"}></Heading>
        <Stack sx={LoginBox}>
          {bossData?.length > 0 && bossData.map((entries, index) => {
            return ( 
            <Stack key={index}>
              <Text>hi</Text>
            </Stack>)
          })}
        </Stack>
      </Stack>
    </Flex>
  )

}