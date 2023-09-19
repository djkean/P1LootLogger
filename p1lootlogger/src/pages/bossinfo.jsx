import { Badge, Center, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DropDownMenu, InfoCardStack, InfoDropBadge, InfoImageLayout, InfoSummaryCard, InfoTabButton, InfoTabStack } from "../components/pagestyles";
import { getToken } from "../shared/getToken";

export const BossInfo = () => {
 const [bossInfoValues, setBossInfoValues] = useState([]);

 const navigate = useNavigate()
  const getBossInfoFromDb = async () => {
    try {
      const bossInfoDbResponse = await fetch("/api/bossinfo", { headers: {
        "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json"
      } }, {method: "GET" })
      if (bossInfoDbResponse.status !== 200) {
        console.log("You need to log in")
        navigate("/login")
      }
      const bossInfoDbResponseJson = await bossInfoDbResponse.json();
      setBossInfoValues(bossInfoDbResponseJson.response)
      return bossInfoDbResponseJson.response
    }
    catch(err) {
      console.log(err, "Something went wrong")
    }
  }

  useEffect(() => {
    console.log()
    getBossInfoFromDb()
  }, []);

  if (bossInfoValues.length === 0) return <h2>fetching Boss Info...</h2>
  //bossInfoValues.map((bossData) => console.log(bossData.bossDrops, bossData.teamData[0].Pokemon)) 
  return (
    bossInfoValues.length > 0 && bossInfoValues.map((info) => {
      return (
        <Center key={info.ID} py={6} bg={"#2A2823"}>
          <Stack sx={InfoCardStack} w={{sm: '100%', md: '540px'}} height={{sm: '476px', md: '20rem'}} direction={{base: 'column', md: 'row'}}>
            <Flex flex={1}>
              <Image sx={InfoImageLayout} src={`/images/${info.ID}.png`} />
            </Flex>
            <Stack sx={InfoSummaryCard}>
              <Heading fontSize={'2xl'} fontFamily={'body'}> {info.bossName} </Heading>
              <Text fontWeight={600} color={'gray.700'} size="sm" mb={4}> {info.region} / {info.location} </Text>
              <Text textAlign={'center'} px={3} fontWeight={400}> 
                <Link to="/bossdetails">A comprehensive collection of all {info.bossName}'s information. </Link>
              </Text>
              <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
                <Badge sx={InfoDropBadge}> {info.bossDrops[0]} </Badge>
                <Badge sx={InfoDropBadge}> {info.bossDrops[1]} </Badge>
                <Badge sx={InfoDropBadge}> {info.bossDrops[2]} </Badge>
              </Stack>
              <Stack align={'center'} justify={'center'} direction={'row'} mt={4}>
                <Badge sx={InfoDropBadge}> {info.bossDrops[3]} </Badge>
                <Badge sx={InfoDropBadge}> {info.bossDrops[4]} </Badge>
              </Stack>
              <Stack sx={InfoTabStack} direction={"row"}>
                <Menu direction={"row"}>
                  <MenuButton sx={InfoTabButton}>View Loot</MenuButton>
                  <MenuList bg="#5D5D5D">
                    {info.bossDrops.map((loot, index) => {
                      return (<MenuItem key={index} sx={DropDownMenu}>{loot}</MenuItem>)
                    })}
                  </MenuList>
                </Menu>
              </Stack>
              <Stack sx={InfoTabStack} direction={"row"}>
                <Menu>
                  <MenuButton sx={InfoTabButton}>View Roster</MenuButton>
                  <MenuList bg="#5D5D5D">
                    {info.teamData.map((roster, index) => {
                      return (<MenuItem key={index} sx={DropDownMenu}>{roster.Pokemon}</MenuItem>)
                    })}
                  </MenuList>
                </Menu>
              </Stack>
            </Stack>
          </Stack>
        </Center>
      )
    })
  )
}


//<Button sx={InfoTabButton}> View Roster </Button>

/* 
{info.teamData.map((roster) => {
  return (
    <MenuItem>{roster.Pokemon}</MenuItem>
  )
})}
*/

/* 
<MenuItem>{info.teamData[0]?.Pokemon}</MenuItem>
<MenuItem>{info.teamData[1]?.Pokemon}</MenuItem>
<MenuItem>{info.teamData[2]?.Pokemon}</MenuItem>
<MenuItem>{info.teamData[3]?.Pokemon}</MenuItem>
<MenuItem>{info.teamData[4]?.Pokemon}</MenuItem>
<MenuItem>{info.teamData[5]?.Pokemon}</MenuItem>
*/