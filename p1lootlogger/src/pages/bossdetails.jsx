import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { InfoImageLayout, InfoSummaryCard, 
  InfoDropBadge, InfoTabStack, InfoTabButton, DropDownMenu, BossCardStack } from "../components/pagestyles";
import { Badge, Center, Flex, Heading, Image, 
  Menu, MenuButton, MenuList, Stack, Text, MenuItem } from "@chakra-ui/react";
import { getToken } from "../shared/getToken";


export const BossDetails = () => {
  const [bossDetails, setBossDetails] = useState([]);

  const navigate = useNavigate()
  const getBossDetailsFromDb = async () => {
    try {
      const bossDetailsResponse = await fetch("/api/bossdetails", { headers: {
        "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json"
      } }, { method: "GET" });
      if (bossDetailsResponse.status !== 200) {
        console.log("You need to log in")
        navigate("/login")
      }
      const bossDetailsResponseJson = await bossDetailsResponse.json();
      setBossDetails(bossDetailsResponseJson.response);
      return bossDetailsResponseJson.response;
    }
    catch(err) {
      console.log(err, "Something went wrong")
    }
  }

  useEffect(() => {
    getBossDetailsFromDb();
  }, []);

  if (bossDetails.length === 0) return <h2>fetching Boss Details...</h2>;
  
  return (
    <>
      {bossDetails?.length > 0 && bossDetails.filter((boss => boss.ID === 101)).map((allinfo) => {
        return (
          <Center key={allinfo.ID} py={6} bg={"#2A2823"}>
            <Stack sx={BossCardStack} w={{sm: '100%', md: '800px'}} height={{sm: '476px', md: '25rem'}} direction={{base: 'column', md: 'row'}}>
              <Flex flex={1}>
                <Image sx={InfoImageLayout} src={`/images/${allinfo.ID}.png`} />
              </Flex>
              <Stack sx={InfoSummaryCard}>
                <Heading fontSize={'2xl'} fontFamily={'body'}> {allinfo.bossName} </Heading>
                <Text fontWeight={600} color={'gray.700'} size="sm" mb={4}> {allinfo.region} / {allinfo.location} </Text>
                <Text textAlign={'center'} px={3} fontWeight={400}> 
                  <Link to="/bossdetails">A comprehensive collection of all {allinfo.bossName}'s information. </Link>
                </Text>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
                  <Badge sx={InfoDropBadge}> {allinfo.bossDrops[0]} </Badge>
                  <Badge sx={InfoDropBadge}> {allinfo.bossDrops[1]} </Badge>
                  <Badge sx={InfoDropBadge}> {allinfo.bossDrops[2]} </Badge>
                </Stack>
                <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
                  <Badge sx={InfoDropBadge}> {allinfo.bossDrops[3]} </Badge>
                  <Badge sx={InfoDropBadge}> {allinfo.bossDrops[4]} </Badge>
                </Stack>
                <Stack sx={InfoTabStack} direction={"row"}>
                  <Menu direction={"row"}>
                    <MenuButton sx={InfoTabButton}>View Loot</MenuButton>
                    <MenuList bg="#5D5D5D">
                      {allinfo.bossDrops.map((drops, index) => {
                        return (<MenuItem key={index} sx={DropDownMenu}>{drops}</MenuItem>)
                      })}
                    </MenuList>
                  </Menu>
                </Stack>
                <Stack sx={InfoTabStack} direction={"row"}>
                  <Menu>
                    <MenuButton sx={InfoTabButton}>View Roster</MenuButton>
                    <MenuList bg="#5D5D5D">
                      {allinfo.teamData.map((roster, index) => {
                        return (<MenuItem key={index} sx={DropDownMenu}>{roster.Pokemon}</MenuItem>)
                      })}
                    </MenuList>
                  </Menu>
                </Stack>
              </Stack>
            </Stack>
          </Center>
        )
      })}
    </>
  )
}