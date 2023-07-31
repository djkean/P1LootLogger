import { Box, Button, Container, Heading, SimpleGrid, Text, Center, HStack, Image} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { itemTableStyles, parentItemGridStyles, itemGridStyles } from "../components/pagestyles";

export const ItemTable = () => {
const [itemTableValues, setItemTableValues] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [matchingItems, setMatchingItems] = useState([]);

const getItemsFromDb = async () => {
  const itemDbResponse = await fetch("/api/test", { method: "GET" })
  const itemDbResponseJson = await itemDbResponse.json();
  setItemTableValues(itemDbResponseJson.response)
  return itemDbResponseJson.response
}

const getMatchingItems = (searchValue) => {
  const filteredItems = Object.values(itemTableValues).filter(
    (key) => key.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  setMatchingItems(filteredItems);
};

const handleSearch = (searchValue) => {
  setCurrentPage(1);
  return getMatchingItems(searchValue);
}

const previousPage = currentPage - 1;
const nextPage = currentPage + 1;
const itemsPerPage = 100;
const totalPages = Math.ceil(Object.keys(matchingItems).length / itemsPerPage);
const itemsOnCurrentPage = useMemo(() => {
  const itemsOnPageMemo = Object.keys(matchingItems)?.sort((a, b) => 
  matchingItems[a].name.localeCompare(matchingItems[b].name)
  )?.filter(
    (_, index) => index < currentPage * itemsPerPage 
    && index >= (currentPage -1) * itemsPerPage);
    return itemsOnPageMemo;
}, [currentPage, matchingItems])

const testingOn = () => {
  console.log("hello there this button works")
}


useEffect(() => { 
  getItemsFromDb()
}, []);

//too many center components, move to regular css for those maybe?
  if (itemTableValues.length === 0) return <h2> Fetching Items...</h2>

  /* if (matchingItems.length === 0) {
    return (
      <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
        <Center>
          <Text>No items matched your search.</Text>
        </Center>
      </Container>
    )
  } */

  return (<div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Heading my="0.5em" p="0.75em">All Items</Heading>
      </Center>
      <Center>
        <Text>A list of all items found in PokeOne</Text>
      </Center>
      <Center>
        <Box sx={itemTableStyles} w="36.5em">
          <Button onClick={()=>setCurrentPage((currentPage) => currentPage + 1)}></Button>
          <Text>Search bar or something else here later</Text>
        </Box>
      </Center>
      {itemTableValues.length > 0 && itemTableValues.map((item) => {
        return (
          <SimpleGrid key={item.id} sx={parentItemGridStyles}>
            <Center>
              <HStack>
                <Box sx={itemGridStyles} w="2.5em"> <Image src={`/images/items/icons/${item.image}.png`}/>
                </Box>
                <Box sx={itemGridStyles} w="8em">{item.name}</Box>
                <Box sx={itemGridStyles} w="25em" mr="2em">{item.description}</Box>
              </HStack>
            </Center>
          </SimpleGrid>
        )
      })}
    </Container>
  </div>);
};
