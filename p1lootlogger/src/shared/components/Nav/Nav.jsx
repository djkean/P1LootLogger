import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
  return ( <>
  <Link to="/home">Home</Link>
  <Link to="/tables">Tables</Link>
  </>
  )
}
