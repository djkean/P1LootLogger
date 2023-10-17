import { getToken } from "../shared/getToken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUnixTimestamp } from "./getUnixTime";

export function logout() {
  axios.post("/logout")
}