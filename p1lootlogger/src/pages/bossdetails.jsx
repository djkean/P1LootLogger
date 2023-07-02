import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { InfoCardStack, InfoImageLayout, InfoSummaryCard, 
  InfoDropBadge, InfoTabStack, InfoTabButton, DropDownMenu, bossCardStack } from "../components/pagestyles";
  import { Badge, Center, Flex, Heading, Image, 
    Menu, MenuButton, MenuList, Stack, Text, MenuItem } from "@chakra-ui/react";

export const BossDetails = () => {
  const [bossDetails, setBossDetails] = useState([]);
  const [bossListValues, setBossListValues] = useState([])

  const getBossDetailsFromDb = async () => {
    const bossDetailsResponse = await fetch("/api/bossdetails", { method: "GET" });
    const bossDetailsResponseJson = await bossDetailsResponse.json();
    setBossDetails(bossDetailsResponseJson.response);
    return bossDetailsResponseJson.response;
  }

  const getBossListFromDb = async () => {
    const bossDbResponse = await fetch("/api/boss", { method: "GET" })
    const bossDbResponseJson = await bossDbResponse.json();
    setBossListValues(bossDbResponseJson.response)
    return bossDbResponseJson.response
  } 

  useEffect(() => {
    getBossDetailsFromDb();
    getBossListFromDb();

    console.clear();
    console.log('BossDetails component re-render');
    console.log(bossDetails)
    console.log(bossListValues)
  }, []);

  if (bossDetails.length === 0) return <h2>fetching Boss Details...</h2>;
  
 return (
  <>
  {bossDetails?.length > 0 && bossDetails.filter((boss => boss.ID === 101)).map((allinfo) => {
    console.log("hello")
    return (
      <Center key={allinfo.ID} py={6} bg={"#2A2823"}>
        <Stack sx={bossCardStack} w={{sm: '100%', md: '800px'}} height={{sm: '476px', md: '25rem'}} direction={{base: 'column', md: 'row'}}>
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
                  {allinfo.bossDrops.map((drops) => {
                    return (<MenuItem sx={DropDownMenu}>{drops}</MenuItem>)
                  })}
                </MenuList>
              </Menu>
            </Stack>
            <Stack sx={InfoTabStack} direction={"row"}>
              <Menu>
                <MenuButton sx={InfoTabButton}>View Roster</MenuButton>
                <MenuList bg="#5D5D5D">
                  {allinfo.teamData.map((roster) => {
                    return (<MenuItem sx={DropDownMenu}>{roster.Pokemon}</MenuItem>)
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

/*  return (
    <>
      {bossDetails?.length > 0 && bossDetails.filter((boss => boss.ID === 101))
      .map((allInfo) => {
        return (
          <table key={allInfo.ID}>
            <tbody>
              <tr>
                <td>{allInfo.ID}</td>
                <td>{allInfo.bossName}</td>
                <td>{allInfo.bossDrops}</td>
                <td>{allInfo.teamType}</td>
                <td>{allInfo.teamSize}</td>
                <td>{allInfo.region}</td>
                <td>{allInfo.subRegion}</td>
                <td>{allInfo.location}</td>
              </tr>
              <tr>
                <td colSpan='8'>
                  {allInfo.teamData.map(pokemon => { return (
                    <>
                      <div>{pokemon.Pokemon}</div>
                      <div>{pokemon.Nature}</div>
                      <div>
                        <b>Moves</b>
                        {pokemon['Move-1']}, {pokemon['Move-2']}, 
                        {pokemon['Move-3']}, {pokemon['Move-4']}
                      </div>
                    </>
                  )})}
                </td>
              </tr>
            </tbody>
          </table>
        )
      })}
    </>
  );*/

 
}