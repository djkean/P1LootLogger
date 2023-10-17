export function getUnixTimestamp() {
  const unix = Math.floor(Date.now() / 1000)
  console.log(unix)
  return unix
}