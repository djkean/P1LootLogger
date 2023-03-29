export function loginVerification(loginDetails) {
  let error = {}
  //const usernamePattern = /^[a-z0-9_-]{3,16}$/
  const emailPattern = /^[^\s@]+@[^\s@]\.[^\s@]+$/
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

  if(loginDetails.email === "") {
    error.email = "Please enter an Email"
  }
  else if(!emailPattern.test(loginDetails.email)) {
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

/*  
  //checking username for errors
  if(loginDetails.username === "") {
    error.username = "Please enter a Username"
  }
  else if (!usernamePattern.test(loginDetails.username)) (
    error.username = "Username must be 3-16 characters long & is restricted to alphanumeric characters (A-Z, 0-9), - and _"
  )
  else {
    error.username = ""
  }
  */