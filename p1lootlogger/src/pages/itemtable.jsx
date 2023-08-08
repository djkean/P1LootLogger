import { Box, Button, Container, Heading, SimpleGrid, Text, Center, HStack, Image} from "@chakra-ui/react";
import React from "react";
import { useEffect, useState, useMemo } from "react";
import { itemTableStyles, parentItemGridStyles, itemGridStyles } from "../components/pagestyles";

export const ItemTable = () => {
const [itemTableValues, setItemTableValues] = useState([]);
const [page, setPage] = useState(1);

const previousPage = page - 1;
const nextPage = page + 1;
const itemsPerPage = 50;
const totalPages = Math.ceil(itemTableValues.length / itemsPerPage);
const itemsOnCurrentPage = useMemo(() => {
  const itemsOnPageMemo = itemTableValues?.sort((a, b) =>
  itemTableValues[a]?.name.localeCompare(itemTableValues[b]?.name)
  )
  ?.filter((_, index) => 
  index < page * itemsPerPage && index >= previousPage * itemsPerPage)
  return itemsOnPageMemo;
}, [page, itemTableValues]);

const getItemsFromDb = async () => {
  const itemDbResponse = await fetch("/api/test", { method: "GET" })
  const itemDbResponseJson = await itemDbResponse.json();
  setItemTableValues(itemDbResponseJson.response)
  console.log(itemDbResponseJson.response);
  return itemDbResponseJson.response
}

useEffect(() => { 
  getItemsFromDb()
}, []);

  if (itemTableValues.length === 0) return <h2>Fetching Items...</h2>

  return (<div>
    <Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
      <Center>
        <Button onClick={() => setPage(previousPage)}
        isDisabled={previousPage < 1 ? true : false}>
          {previousPage}      
        </Button>
        <Button onClick={() => setPage(nextPage)}
        isDisabled={page >= totalPages ? true : false}>
          {nextPage}
        </Button>
      </Center>
      <Center>
        <Heading my="0.5em" p="0.75em">All Items</Heading>
      </Center>
      <Center>
        <Text>A list of all items found in PokeOne</Text>
      </Center>
      <Center>
        <Box sx={itemTableStyles} w="36.5em">
          <Text>Search bar or something else here later</Text>
        </Box>
      </Center>
      {itemsOnCurrentPage.length > 0 && itemsOnCurrentPage.map((item) => {
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
