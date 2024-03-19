import { Heading, Stack, TableContainer, Table, Tbody, Tr, Td, Flex, Box } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { LoginFlex, LoginStack, BossBox } from "../components/pagestyles";
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

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} align={"center"}>
        <Heading my="0.5em" p="0.75em">Boss List</Heading>
        <Box w="30em" align={"center"}>
          <Text fontSize={"xl"} my="0.5em">A list of PokeOne's Bosses and daily battles</Text>
        </Box>
        <Stack sx={BossBox}>
          <TableContainer>
            <Table variant="simple" size="lg">
              <Tbody>
                {bossTableValues.length > 0 && bossTableValues.map((boss) => {
                  return (
                    <Tr key={boss.ID}>
                      <Td color={"#FDCA40"} textDecor={"underline"}>
                        <Link to={"/bossdata/" + boss.ID}>{boss.bossName}</Link>
                      </Td>
                      <Td></Td>
                      <Td></Td>
                      <Td color={"#FDCA40"}>{boss?.region}</Td>
                      <Td color={"#FDCA40"}>{boss?.location}</Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Flex>
  );
};