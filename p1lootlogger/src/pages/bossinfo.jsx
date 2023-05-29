import { Badge, Button, Center, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { InfoCardStack, InfoImageLayout, InfoSummaryCard, InfoDropBadge, InfoTabStack, InfoTabButton } from "../components/pagestyles";
import { bossImage } from "../imageImport";

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

  bossInfoValues.map((bossData) => console.log(bossData.bossDrops)) 

  //src={bossImage(info.ID)}

  return (
    bossInfoValues.length > 0 && bossInfoValues.map((info) => {
      return (
          <Center key={info.ID} py={6}>
            <Stack sx={InfoCardStack} w={{sm: '100%', md: '540px'}} height={{sm: '476px', md: '20rem'}} direction={{base: 'column', md: 'row'}}>
              <Flex flex={1}>
                <Image sx={InfoImageLayout} src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png"/>
              </Flex>
              <Stack sx={InfoSummaryCard}>
                <Heading fontSize={'2xl'} fontFamily={'body'}> {info.bossName} </Heading>
                <Text fontWeight={600} color={'gray.700'} size="sm" mb={4}> {info.region} / {info.location} </Text>
                <Text textAlign={'center'} px={3} fontWeight={400}> 
                  A comprehensive collection of all {info.bossName}'s stats and information. 
                </Text>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                  <Badge sx={InfoDropBadge}> {info.bossDrops[0]} </Badge>
                  <Badge sx={InfoDropBadge}> {info.bossDrops[1]} </Badge>
                  <Badge sx={InfoDropBadge}> {info.bossDrops[2]} </Badge>
                </Stack>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                <Badge sx={InfoDropBadge}> {info.bossDrops[3]} </Badge>
                <Badge sx={InfoDropBadge}> {info.bossDrops[4]} </Badge>
                </Stack>
                <Stack sx={InfoTabStack} direction={"row"}>
                  <Button sx={InfoTabButton}> View Loot </Button>
                  <Button sx={InfoTabButton}> View Roster </Button>
                </Stack>
              </Stack>
            </Stack>
          </Center>
      )
    })
  )
}