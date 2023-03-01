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
  h: "4em",
  px: "0.2em",
  py: "0.1em",
  borderRadius: " 0.3em",
  boxShadow: "base",
}

useEffect(() => {
  function getItemsFromTable() {
    const getItemsFromTable = fetch('/api/test', {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((items) => {
        console.log('Fetched items from database:', items);
    });
    //setItemTableValues(getItemsFromTable);
    //console.log();
  }

  getItemsFromTable();
}, []);

  return <div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="gray.500">
      <Center>
        <Heading my="1em" p="0.75em">All Items</Heading>
      </Center>
      <Center>
        <Text>A list of all items found in PokeOne</Text>
      </Center>
      <Center>
        <Text>If you think any items are missing, please let us know!</Text>
      </Center>
      <Center>
        <Box sx={itemTableStyles} w="564px">
          <Text>Search bar or something else here later</Text>
        </Box>
      </Center>
        <SimpleGrid sx={parentItemGridStyles}>
          <Center>
            <HStack bg="gray.500">
            <Box sx={itemGridStyles} w="6em">Item Image</Box>
            <Box sx={itemGridStyles} w="10em">Item Name</Box>
            <Box sx={itemGridStyles} w="19em" mr="2em">Item Description</Box>
            </HStack>
          </Center>
        </SimpleGrid>
        <SimpleGrid sx={parentItemGridStyles}>
          <Center>
            <HStack bg="gray.500">
            <Box sx={itemGridStyles} w="6em">Item Image</Box>
            <Box sx={itemGridStyles} w="10em">Item Name</Box>
            <Box sx={itemGridStyles} w="19em" mr="2em">Item Description</Box>
            </HStack>
          </Center>
        </SimpleGrid>
    </Container>
  </div>;
};
