import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

export const BossDetails = () => {
  const [bossDetails, setBossDetails] = useState([]);

  const getBossDetailsFromDb = async () => {
    const bossDetailsResponse = await fetch("/api/bossdetails", { method: "GET" });
    const bossDetailsResponseJson = await bossDetailsResponse.json();
    setBossDetails(bossDetailsResponseJson.response);
    return bossDetailsResponseJson.response;
  }

  useEffect(() => {
    getBossDetailsFromDb();

    console.clear();
    console.log('BossDetails component re-render');
    console.log(bossDetails)
  }, []);

  if (bossDetails.length === 0) return <h2>fetching Boss Details...</h2>;
  
  return (
    <>
      {bossDetails?.length > 0 && bossDetails.filter((boss => boss.ID === 101)).map((allInfo) => {
        return (
          <table key={allInfo.ID}>
            <tbody>
              <tr>
                <td>{allInfo.ID}</td>
                <td>{allInfo.bossName}</td>
                <td>{allInfo.bossDrops}</td>
                <td>{allInfo.teamType}</td>
                <td>{allInfo.teamSize}</td>
                <td>{allInfo.region}</td>
                <td>{allInfo.subRegion}</td>
                <td>{allInfo.location}</td>
              </tr>
              <tr>
                <td colSpan='8'>
                  {allInfo.teamData.map(pokemon => { return (
                    <>
                      <div>{pokemon.Pokemon}</div>
                      <div>{pokemon.Nature}</div>
                      <div>
                        <b>Moves</b>
                        {pokemon['Move-1']}, {pokemon['Move-2']}, 
                        {pokemon['Move-3']}, {pokemon['Move-4']}
                      </div>
                    </>
                  )})}
                </td>
              </tr>
            </tbody>
          </table>
        )
      })}
    </>
  );
}