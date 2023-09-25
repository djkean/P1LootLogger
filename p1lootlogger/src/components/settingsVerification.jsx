export function checkUsernameRegex(newUsername) {
  let error = {}
  const usernamePattern = /^[a-zA-Z90-9_-]{3,16}$/

  if (newUsername === "") {
    error.username = "Please enter a new Username"
  }
  else if (!usernamePattern.test(newUsername)) {
    error.username = "Username must be 3-16 characters long & is restricted to alphanumeric characters (A-Z, 0-9), - and _"
  }
  else {
    error.username = ""
  }
  return error
}

export function checkPasswordRegex(newPassword) {
  let passwordError = {}
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if (oldPassword === "") {
    error.oldPassword = "Please enter your current Password"
  }
}