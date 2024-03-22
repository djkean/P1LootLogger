import React from "react";
import { Box, Button, Center, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { LoginBox, LoginFlex } from "../components/pagestyles";

export const HomePage = () => {
  return ( 
    <Flex sx={LoginFlex} align={"center"}>
      <Stack>
        <Heading>PokeOne LootLogger</Heading>
        <Text>Welcome to PokeOne LootLogger, a "crowdsourced" wiki of item and boss data for PokeOne.
          This community driven project is designed to let players help themselves by contributing and combining their information to create a reference for any activity's rewards, and the likelihood of earning those rewards.
          You can view tables for the items and bosses of PokeOne. Each Boss has a detailed page of other player's reports of what they received from those bosses, allowing you to see personal results from each individual statistic collected by players.
          In order to view and submit loot, you must first create and account, which you can do [here].
        </Text>
      </Stack>
    </Flex>
  )
}