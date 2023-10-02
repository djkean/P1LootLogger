export function checkUsernameRegex(newUsername) {
  let error = {}
  const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/

  if (newUsername === "") {
    error.username = "Please enter a new Username"
  }
  else if (!usernamePattern.test(newUsername.username)) {
    error.username = "Username must be 3-16 characters long & is restricted to alphanumeric characters (A-Z, 0-9), - and _"
  }
  else {
    error.username = ""
  }
  return error
}

export function deleteAccountRegex(deleteAccount) {
  let error = {}
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if (deleteAccount === "") {
    error.delAccount = "This field cannot be blank"
  }
  else if (!passwordPattern.test(deleteAccount.delAccount)) {
    error.delAccount = "The Password you typed doesn't match requirements (Upper & Lowercase characters, and numbers are required)"
  }
  else {
    error.delAccount = ""
  }
  return error
}

export function checkPasswordRegex(newPassword) {
  let error = {}
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if (newPassword.oldPassword === "") {
    error.oldPassword = "This field cannot be blank"
  }
  /* 
  If the typed password fails a regex quest then it cannot be their current password anyway
  else if (!passwordPattern.test(oldPassword)) {
    error.oldPassword = ""
  } */
  // eslint-disable-next-line no-undef
  else if (newPassword.oldPassword === newPassword.newPassword1 || newPassword.oldPassword === newPassword.newPassword2) {
    error.oldPassword = "Your new password matches your current typed password"
  }
  else {
    error.oldPassword = ""
  }
  // eslint-disable-next-line no-undef
  if (newPassword.newPassword1 === "") {
    error.newPassword1 = "This field cannot be blank"
  }
   // eslint-disable-next-line no-undef
  else if (!passwordPattern.test(newPassword.newPassword1)) {
    error.newPassword1 = "Make sure your password contains numbers, capital, and lowercase characters"
  }
  else {
    error.newPassword1 = ""
  }
  // eslint-disable-next-line no-undef
  if (newPassword.newPassword2 === "") {
    error.newPassword2 = "This field cannot be blank"
  }
   // eslint-disable-next-line no-undef
  else if (!passwordPattern.test(newPassword.newPassword2)) {
    error.newPassword2 = "Make sure your password contains numbers, capital, and lowercase characters"
  }
   // eslint-disable-next-line no-undef
  else if (newPassword.newPassword1 !== newPassword.newPassword2) {
    error.newPassword1 = "Make sure both new password fields match"
    error.newPassword2 = "Make sure both new password fields match"
  }
  else {
    error.newPassword2 = ""
  }
  return error
}