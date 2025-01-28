import { Box, Button, Heading, Text, Center, Image, Input, Table, Tbody, Tr, Td, TableContainer, Flex, Stack } from "@chakra-ui/react";
import React, { useEffect, useState, useMemo } from "react";
import { PageButtonUI, SearchBarUI, LoginFlex, LoginStack, BossBox } from "../components/pagestyles";
import { getToken } from "../shared/getToken";
import { useNavigate } from "react-router-dom";

export const ItemTable = () => {
  const [itemTableValues, setItemTableValues] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);

  const previousPage = page - 1;
  const nextPage = page + 1;
  const itemsPerPage = 25;
  const totalPages = Math.ceil(itemTableValues?.length / itemsPerPage);

  const itemsOnCurrentPage = useMemo(() => {
    const getMatchingItems = itemTableValues?.sort((a, b) =>
    itemTableValues[a]?.name.localeCompare(itemTableValues[b]?.name)
    )?.filter((key) => 
    key.name.toLowerCase().indexOf(searchFilter.toLocaleLowerCase()) > -1)

    const totalSearchResults = getMatchingItems?.length
    const itemsToDisplay = getMatchingItems?.filter((_, index) => 
    index < page * itemsPerPage && index >= previousPage * itemsPerPage)
    return {itemCount: totalSearchResults, items: itemsToDisplay};
  }, [page, itemTableValues, searchFilter, previousPage]);

  const navigate = useNavigate()
  const getItemsFromDb = async () => {
    try {
      const itemDbResponse = await fetch("/api/test", { headers: { "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json" } } ,{ method: "GET" })
      if (itemDbResponse.status !== 200) {
        console.log("You need to log in")
        navigate("/login")
      }
      const itemDbResponseJson = await itemDbResponse.json();
      console.log(itemDbResponse)
      setItemTableValues(itemDbResponseJson.response)
      return itemDbResponseJson.response
    }
    catch(err) {
      console.log(err, "Something went wrong")
      navigate("/login")
    }
  }

  const updateSearchQuery = (searchValue) => {
    setPage(1);
    setSearchFilter(searchValue)
  }

  useEffect(() => { 
    getItemsFromDb()
  }, []);


  if (itemTableValues.length === 0) return <h2>Fetching Items...</h2>

  return (
    <Flex sx={LoginFlex} align={"center"}>
      <Stack sx={LoginStack} align={"center"}>
        <Heading my="0.5em" p="0.75em">All Items</Heading>
        <Box w="30em" align={"center"}>
          <Text fontSize={"xl"} my="0.5em">A list of all items found in PokeOne</Text>
          <Input type="text" sx={SearchBarUI} bg={"#2A2823"} placeholder="Search for an item" onChange={(e) => updateSearchQuery(e.target.value)}></Input>
          <Center sx={SearchBarUI} >
            <Text>{itemsOnCurrentPage.itemCount} of {itemTableValues.length} items matched your search.</Text>
            <Button sx={PageButtonUI} onClick={() => setPage(previousPage)}
            isDisabled={previousPage < 1 ? true : false}>
              {previousPage}      
            </Button>
            <Button sx={PageButtonUI} onClick={() => setPage(nextPage)}
            isDisabled={page >= totalPages ? true : false}>
              {nextPage}
            </Button>
          </Center>
        </Box>
        <Stack sx={BossBox}>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Tbody>
                {(searchFilter !== "" && itemsOnCurrentPage.itemCount === 0) ? (
                  <Box align={"center"}>
                    <Text color={"#FDCA40"}>No Items matched your search.</Text>
                  </Box>
                ) : itemsOnCurrentPage.itemCount > 0 && itemsOnCurrentPage.items.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td>
                        <Image display={"inline-block"} mx={"1em"} src={`/images/items/icons/${item.image}.png`}/>
                      </Td>
                      <Td color={"#FDCA40"} >{item.name}</Td>
                      <Td color={"#FDCA40"} fontSize={"xs"} >{item.description}</Td>
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
