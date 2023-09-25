export function regVerification(regDetails) {
  let error = {}
  const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/ 
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  //checking username for errors
  if(regDetails.username === "") {
    error.username = "Please enter a Username"
  }
  else if (!usernamePattern.test(regDetails.username)) {
    error.username = "Username must be 3-16 characters long & is restricted to alphanumeric characters (A-Z, 0-9), - and _"
  }
  else {
    error.username = ""
  }
  //checking email for errors
  if(regDetails.email === "") {
    error.email = "Please enter an Email"
  }
  else if(!emailPattern.test(regDetails.email)) {
    error.email = "Please check that your Email is correct"
  }
  else {
    error.email = ""
  }
  //checking password for errors
  if (regDetails.password === "") {
    error.password = "Please enter a Password"
  }
  else if (!passwordPattern.test(regDetails.password)) {
    error.password = "Please make sure your password contains one or more numbers, capital and lowercase characters"
  }
  else {
    error.password = ""
  }
  return error
}
