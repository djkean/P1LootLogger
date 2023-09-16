export const getToken = () => {
  return localStorage.getItem("P1LL_TOKEN") ?? "INVALID TOKEN"
}