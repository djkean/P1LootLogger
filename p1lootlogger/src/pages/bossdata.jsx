import React, { useState } from "react";
import { getToken } from "../shared/getToken";
import { Box, Center, Flex, Image, Input, Stack, Text } from "@chakra-ui/react";

export const BossData = () => {
  const [bossData, setBossData] = useState([]);
  const [bossLoot, setBossLoot] = useState([]);

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
      return (infoValues, lootValues)
    }
    catch(err) {
      console.log(err)
    }
  }

}