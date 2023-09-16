export const getToken = () => {
  if (typeof localStorage !== "undefined" && localStorage.getItem("P1LL_TOKEN"))
  {
    return localStorage.getItem("P1LL_TOKEN")
  }
  return "INVALID KEY"
}