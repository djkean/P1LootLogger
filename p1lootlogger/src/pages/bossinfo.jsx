import { Badge, Box, Button, Center, Container, Flex, Heading, HStack, Image, Link, SimpleGrid, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useEffect, useState } from "react";
import { itemTableStyles, itemGridStyles, parentItemGridStyles } from "../components/pagestyles";

export const BossInfo = () => {
 /* const [bossInfoValues, setBossInfoValues] = useState([]);

  const getBossInfoFromDb = async () => {
    const bossInfoDbResponse = await fetch("/api/bossinfo", {method: "GET" })
    const bossInfoDbResponseJson = await bossInfoDbResponse.json();
    setBossInfoValues(bossInfoDbResponseJson.response)
    return bossInfoDbResponseJson.response
  }

  useEffect(() => {
    console.log()
    getBossInfoFromDb()
  }, []);

  if (bossInfoValues.length === 0) return <h2>fetching Boss Info...</h2>

  bossInfoValues.map((bossData) => console.log(bossData.teamData)) */

  return (
    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        border="1px grey.900"
        w={{ sm: '100%', md: '540px' }}
        height={{ sm: '476px', md: '20rem' }}
        direction={{ base: 'column', md: 'row' }}
        bg={"#5D5D5D"}
        boxShadow={'2xl'}
        padding={4}>
        <Flex flex={1}>
          <Image
            objectFit="cover"
            boxSize="100%"
            border={"1px grey.900"}
            src={
              'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png'
            }
          />
        </Flex>
        <Stack flex={1} flexDirection="column" justifyContent="center"
          alignItems="center" p={1} pt={2}>
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Mewtwo
          </Heading>
          <Text fontWeight={600} color={'gray.700'} size="sm" mb={4}>
            Kanto / Cerulean Cave
          </Text>
          <Text
            textAlign={'center'}
            px={3}
            fontWeight={400}>
            A comprehensive collection of all Mewtwo's stats and information.
          </Text>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              fontWeight={'400'}
              bg={'orange.200'}
              color={'gray.700'}>
              Mew Egg
            </Badge>
            <Badge
              px={2}
              py={1}
              fontWeight={'400'}
              bg={'orange.200'}
              color={'gray.700'}>
              Jade Orb
            </Badge>
            <Badge
              px={2}
              py={1}
              fontWeight={'400'}
              bg={'orange.200'}
              color={'gray.700'}>
              Reroll Token
            </Badge>
          </Stack>
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          <Badge
              px={2}
              py={1}
              fontWeight={'400'}
              bg={'orange.200'}
              color={'gray.700'}>
              Hidden Ability+ Hour
            </Badge>
            <Badge
              px={2}
              py={1}
              fontWeight={'400'}
              bg={'orange.200'}
              color={'gray.700'}>
              Shiny+ hour
            </Badge>
          </Stack>
          <Stack
            width={'100%'}
            mt={'2rem'}
            direction={'row'}
            padding={2}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'orange.200'}
              color={'gray.700'}
              boxShadow={
                '0px 1px 25px -5px rgb(150 150 90 / 40%), 0 10px 10px -5px rgb(60 60 30 / 40%)'
              }
              _hover={{
                bg: 'orange.300',
              }}
              _focus={{
                bg: 'orange.300',
              }}>
              View Loot
            </Button>
            <Button
              flex={1}
              fontSize={'sm'}
              rounded={'full'}
              bg={'orange.200'}
              color={'gray.700'}
              boxShadow={
                '0px 1px 25px -5px rgb(150 150 90 / 60%), 0 10px 10px -5px rgb(60 60 30 / 60%)'
              }
              _hover={{
                bg: 'orange.300',
              }}
              _focus={{
                bg: 'orange.300',
              }}>
              View Roster
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}

/* return (
	<div>
		<Container as="section" maxW="100hv" maxH="100hv" bg="#5D5D5D" pb="2em">
			<Center>
				<Heading my="0.5em" p="0.75em">(boss name here) - Details</Heading>
			</Center>
			<Center>
				<Text>In-depth information about (boss name here)</Text>
			</Center>
			 {bossInfoValues.length > 0 && bossInfoValues.map((info) => {
				return (
					<SimpleGrid key={info.ID} sx={parentItemGridStyles}>
						<Center>
							<HStack>
								<Box sx={itemGridStyles} w="6em">Boss Image</Box>
								<Box sx={itemGridStyles} w="8em">{info.bossName}</Box>
								<Box sx={itemGridStyles} w="25em" mr="2em">{info?.teamData[1]?.Pokemon}</Box>
							</HStack>
						</Center>
					</SimpleGrid>
				)
			 })}
		</Container>
	</div>
)
} */
