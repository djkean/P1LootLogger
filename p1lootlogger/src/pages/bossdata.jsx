import React, { useState, useEffect } from "react";
import { getToken } from "../shared/getToken";
import { Link, useParams } from "react-router-dom"; 
import { Flex, Heading, Image, Stack, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { BossBox, LoginFlex, LoginStack, PageLink2 } from "../components/pagestyles";

export const BossData = () => {
  const [bossData, setBossData] = useState([]);
  const [bossName, setBossName] = useState({});
  const idFromRoute = useParams();
  const bossID = idFromRoute.id

  const getBossData = async () => {
    try {
      const [bossAndLootData, name] = await Promise.all([
        fetch("/api/bossdata", {
          headers: { 
            "Authorization": `Bearer ${getToken()}`, 
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({ bossID: bossID }),
        }),
        fetch("/api/bossname", {
          headers: { 
            "Authorization": `Bearer ${getToken()}`, 
            "Content-Type": "application/json" 
          },
          method: "POST",
          body: JSON.stringify({ bossID: bossID }),
        }),
      ])
      if (bossAndLootData.status !== 200) {
        return console.log("info query failed")
      }
      if (name.status !== 200) {
        return console.log("name query failed")
      }
      const bossDataJson = await bossAndLootData.json()
      const nameJson = await name.json()
      const bossDataValues = await bossDataJson.response
      const nameValue = await nameJson.response
      console.log(bossDataValues)
      console.log(nameValue)
      setBossData(bossDataValues)
      setBossName(nameValue[0])
      return (bossDataValues, nameValue[0])
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBossData()
    console.log(bossData)
    console.log(bossName)
  }, []);

  if (bossData?.length === 0) return <Text>Waiting on server...</Text>

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} align={"center"}>
        <Heading fontSize={"3xl"} marginBottom={"1em"}>{bossName.bossName}</Heading>
        <Stack sx={BossBox}>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th color={"#FDCA40"}>
                    <Image src={`/images/items/icons/1401.png`}/>
                  </Th>
                  <Th color={"#FDCA40"}>$$$</Th>
                  <Th color={"#FDCA40"}>Boxes</Th>
                  <Th color={"#FDCA40"}>Loot1</Th>
                  <Th color={"#FDCA40"}>Loot2</Th>
                  <Th color={"#FDCA40"}>Loot3</Th>
                  <Th color={"#FDCA40"}>Loot4</Th>
                  <Th color={"#FDCA40"}>Loot5</Th>
                </Tr>
              </Thead>
              <Tbody>
              {bossData?.length > 0 && bossData.map((entries, index) => {
                return ( 
                  <Tr key={index}>
                    <Td color={"#FDCA40"}>{entries?.gold}</Td>
                    <Td color={"#FDCA40"}>{entries?.money}</Td>
                    <Td color={"#FDCA40"}>{entries?.boxes}</Td>
                    <Td color={"#FDCA40"}>
                      <Image display={"inline-block"} mx={"0.5em"} src={`/images/items/icons/${entries?.loot1image}.png`}  />
                      {entries?.loot1name}
                    </Td>
                    <Td color={"#FDCA40"}>
                      <Image display={"inline-block"} mx={"0.5em"} src={`/images/items/icons/${entries?.loot2image}.png`}  />
                      {entries?.loot2name}
                    </Td>
                    <Td color={"#FDCA40"}>
                      <Image display={"inline-block"} mx={"0.5em"} src={`/images/items/icons/${entries?.loot3image}.png`}  />
                      {entries?.loot3name}
                    </Td>
                    <Td color={"#FDCA40"}>
                      <Image display={"inline-block"} mx={"0.5em"} src={`/images/items/icons/${entries?.loot4image}.png`}  />
                      {entries?.loot4name}
                    </Td>
                    <Td color={"#FDCA40"}>
                      <Image display={"inline-block"} mx={"0.5em"} src={`/images/items/icons/${entries?.loot5image}.png`}  />
                      {entries?.loot5name}
                    </Td>
                  </Tr>
                )
              })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
        <Link to="/submitloot">
          <Text sx={PageLink2}>Submit your own loot here</Text>
        </Link>
      </Stack>
    </Flex>
  )
}
