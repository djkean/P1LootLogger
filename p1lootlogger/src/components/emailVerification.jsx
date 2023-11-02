export function checkEmailRegex(confirmEmail) {
  let error = {}
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

  if (confirmEmail === "") {
    error.email = "This field cannot be left blank"
  }
  else if (!emailPattern.test(confirmEmail)) {
    error.email = "Please input a valid Email"
  }
  else {
    error.email = ""
  }
  return error
}