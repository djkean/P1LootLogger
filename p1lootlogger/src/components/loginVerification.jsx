export function loginVerification(loginDetails) {
  let error = {}
  //const usernamePattern = /^[a-z0-9_-]{3,16}$/
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  if (loginDetails.email === "") {
    error.email = "Please enter an Email"
  }
  else if (!emailPattern.test(loginDetails.email)) {
    error.email = "Please check that your Email is correct"
  }
  else {
    error.email = ""
  }
  //checking password for errors
  if (loginDetails.password === "") {
    error.password = "Please enter a Password"
  }
  else if (!passwordPattern.test(loginDetails.password)) {
    error.password = "Please check that your Password is correct"
  }
  else {
    error.password = ""
  }
  return error
}
