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
      console.log()
      getBossDetailsFromDb()
    }, []);
  
    if (bossDetails.length === 0) return <h2>fetching Boss Details...</h2>
    
    bossDetails.map((allInfo) => console.log(allInfo))
    
    return (
    <> 
      <div>
        <table border="1px solid black">
          <tbody>
            {bossDetails.length > 0 && bossDetails.map((allInfo) => {
              return (
                <tr key={allInfo.ID}>
                  <td>{allInfo.ID}</td>
                  <td>{allInfo.bossName}</td>
                  <td>{allInfo.bossDrops}</td>
                  <td>{allInfo.teamType}</td>
                  <td>{allInfo.teamSize}</td>
                  <td>{allInfo.region}</td>
                  <td>{allInfo.subRegion}</td>
                  <td>{allInfo.location}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </> )

          
    // <td>{allInfo.teamData}</td>
  }

 