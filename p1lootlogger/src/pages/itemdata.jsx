import React, { UseEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getToken } from "../shared/getToken";
import { Box, Center, Flex, Heading, Image, Input, Stack, Text } from "@chakra-ui/react";

export const ItemData = () => {
  const [itemInfo, setItemInfo] = useState([])
  const [dropInfo, setDropInfo] = useState([])
  const useQueryString = useParams()
  console.log(useQueryString)

  const [itemData, lootData] = Promise.all([
    
  ])


}