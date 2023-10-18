import { getToken } from "../shared/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUnixTimestamp } from "./getUnixTime";

export function logout() {
  const navigate = useNavigate()
  axios.post("/logout", 
  { headers: { "Authorization": `Bearer ${getToken()}`, "Content-Type": "application/json" } }, 
  { method: "GET" })
  .then(res => {
    console.log("Trying to log out...")
    localStorage.removeItem("P1LL_TOKEN")
  })
  .then(navigate("/login"))
  .catch(err => console.log("ERROR IN LOGOUT", err))
}