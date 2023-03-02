import { Box, Container, Heading, SimpleGrid, Text, Center, HStack} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";

export const ItemTableResults = () => {
const [itemTableValues, setItemTableValues] = useState([]);

const itemTableStyles = {
  px: "1em",
  py: "1em",
  bg: "orange.200",
  color: "green.400",
  mx: "1em",
  my: "0.5em",
  textAlign: "center",
  ':hover': {
    color: "red.200",
    bg: "purple.400"
  }
}

const parentItemGridStyles = {
  p: "0.3em",
  column: 3,
  spacing: 1,
  minChildWidth: "256px",
  maxW: "3xl",
  margin: "auto",
}

const itemGridStyles = {
  bg: "orange.200",
  h: "4.2em",
  px: "0.3em",
  py: "0.1em",
  borderRadius: " 0.3em",
  boxShadow: "base",
  lineHeight: "1.3em",
}

const getItemsFromDb = async () => {
  const itemDbResponse = await fetch("/api/test", { method: "GET" })
  const itemDbResponseJson = await itemDbResponse.json();
  setItemTableValues(itemDbResponseJson.response)
  return itemDbResponseJson.response
}

useEffect(() => { 
  getItemsFromDb()
}, []);

//too many center components, move to regular css for those maybe?
  if (itemTableValues.length === 0) return <h2> Fetching Items...</h2>

  return <div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="gray.500" pb="2em">
      <Center>
        <Heading my="0.5em" p="0.75em">All Items</Heading>
      </Center>
      <Center>
        <Text>A list of all items found in PokeOne</Text>
      </Center>
      <Center>
        <Text>If you think any items are missing, please let us know!</Text>
      </Center>
      <Center>
        <Box sx={itemTableStyles} w="640px">
          <Text>Search bar or something else here later</Text>
        </Box>
      </Center>
      {itemTableValues.length > 0 && itemTableValues.map((item) => {
        return (
          <SimpleGrid key={item.itemID} sx={parentItemGridStyles}>
          <Center>
            <HStack bg="gray.500">
            <Box sx={itemGridStyles} w="6em">Item Image</Box>
            <Box sx={itemGridStyles} w="8em">{item.itemName}</Box>
            <Box sx={itemGridStyles} w="25em" mr="2em">{item.itemDescription}</Box>
            </HStack>
          </Center>
        </SimpleGrid>
      )
      })}
    </Container>
  </div>;
};
