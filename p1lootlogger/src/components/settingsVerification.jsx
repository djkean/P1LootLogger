export function checkUsernameRegex(newUsername) {
  let error = {}
  const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/

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

export function checkPasswordRegex(oldPassword) {
  let error = {}
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if (oldPassword === "") {
    error.oldPassword = "This field cannot be blank"
  }
  /* 
  If the typed password fails a regex quest then it cannot be their current password anyway
  else if (!passwordPattern.test(oldPassword)) {
    error.oldPassword = ""
  } */
  // eslint-disable-next-line no-undef
  else if (oldPassword === newPassword1 || oldPassword === newPassword2) {
    error.oldPassword = "Your new password matches your current typed password"
  }
  else {
    error.oldPassword = ""
  }
  // eslint-disable-next-line no-undef
  if (newPassword1 === "") {
    error.newPassword1 = "This field cannot be blank"
  }
   // eslint-disable-next-line no-undef
  else if (!passwordPattern.test(newPassword1)) {
    error.newPassword1 = "Make sure your password contains numbers, capital, and lowercase characters"
  }
  else {
    error.newPassword1 = ""
  }
  // eslint-disable-next-line no-undef
  if (newPassword2 === "") {
    error.newPassword2 = "This field cannot be blank"
  }
   // eslint-disable-next-line no-undef
  else if (!passwordPattern.test(newPassword2)) {
    error.newPassword2 = "Make sure your password contains numbers, capital, and lowercase characters"
  }
   // eslint-disable-next-line no-undef
  else if (newPassword1 !== newPassword2) {
    error.newPassword1 = "Make sure both new password fields match"
    error.newPassword2 = "Make sure both new password fields match"
  }
  else {
    error.newPassword2 = ""
  }
  return error
}