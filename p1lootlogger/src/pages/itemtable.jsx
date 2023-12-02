import { Box, Button, Container, Heading, SimpleGrid, Text, Center, HStack, Image, Input } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { PageButtonUI, ListGridUI, GridRowUI, SearchBarUI } from "../components/pagestyles";
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

  return (<div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="0.5em" p="0.75em">All Items</Heading>
      </Center>
      <Center>
        <Text>A list of all items found in PokeOne</Text>
      </Center>
      <Center>
        <Box w="36.5em">
          <Input type="text" sx={SearchBarUI} onChange={(e) => updateSearchQuery(e.target.value)}></Input>
        </Box>
      </Center>
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
      {(searchFilter !== "" && itemsOnCurrentPage.itemCount === 0) ? (
        <Center>
          <Text>No items matched your search.</Text>
        </Center>
      ) : itemsOnCurrentPage.itemCount > 0 && itemsOnCurrentPage.items.map((item) => {
        return (
          <SimpleGrid key={item.id} sx={ListGridUI}>
            <Center>
              <HStack>
                <Box sx={GridRowUI} w="10em">
                  <Image src={`/images/items/icons/${item.image}.png`}/>
                  {item.name}
                </Box>
                <Box sx={GridRowUI} w="30em" mr="2em">{item.description}</Box>
              </HStack>
            </Center>
          </SimpleGrid>
        )
      })}
    </Container>
  </div>);
};
