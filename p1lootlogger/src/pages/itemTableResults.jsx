import React from "react";
import { useEffect, useState } from "react";
import { stringify, parse } from "flatted"

export const ItemTableResults = () => {
const [itemTableValues, setItemTableValues] = useState([]);

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

  return <p>beans</p>;
};
