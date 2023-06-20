import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 



export const BossDetails = () => {
  const [bossDetails, setBossDetails] = useState([]);

    const getBossDetailsFromDb = async () => {
      const bossDetailsResponse = await fetch("/api/bossdetails", { method: "GET" })
      const bossDetailsResponseJson = await bossDetailsResponse.json();
      setBossDetails(bossDetailsResponseJson.response)
      return bossDetailsResponseJson.response
    }

    useEffect(() => {
      console.log(bossDetails)
      getBossDetailsFromDb()
    }, []);
  
    if (bossDetails?.length === 0) return <h2>fetching Boss Details...</h2>

    bossDetails.map((details) => console.log(details.bossName)) 
  }

 