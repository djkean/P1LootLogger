import { Box, Container, Heading, SimpleGrid, Text, Center, HStack} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { itemTableStyles, parentItemGridStyles, itemGridStyles } from "../components/pagestyles";

export const ItemTable = () => {
const [itemTableValues, setItemTableValues] = useState([]);

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

  return (<div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
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
              <HStack>
                <Box sx={itemGridStyles} w="6em">Item Image</Box>
                <Box sx={itemGridStyles} w="8em">{item.itemName}</Box>
                <Box sx={itemGridStyles} w="25em" mr="2em">{item.itemDescription}</Box>
              </HStack>
            </Center>
          </SimpleGrid>
        )
      })}
    </Container>
  </div>);
};
