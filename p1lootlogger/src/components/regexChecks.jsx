//dont forget to change import paths before deleting the originals!!
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
const usernamePattern = /^[a-zA-Z0-9_-]{3,16}$/
const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

//new regex for all 2 field password checks
export function comparePasswords(firstField, secondField) {
  let error = {}
  if (firstField === "") {
    error.firstField = "This field cannot be blank"
  } 
  else if (!passwordPattern.test(firstField)) {
    error.firstField = "Make sure your new password contains numbers, capital, and lowercase characters"
  }
  else {
    error.firstField = ""
  }
  if (secondField == "") {
    error.secondField = "This field cannot be blank"
  }
  else if (!passwordPattern.test(secondField)) {
    error.secondField = "Make sure your new password contains numbers, capital, and lowercase characters"
  }
  else if (firstField !== secondField) {
    error.firstField = "Make sure both passwords match"
    error.secondField = "Make sure both passwords match"
  }
  else {
    error.secondField = ""
  }
  return error
}


//used for /login
export function loginVerification(loginDetails) {
  let error = {}

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
    error.password = "Incorrect password"
  }
  else {
    error.password = ""
  }
  return error
}

//used for forgotpassword
export function checkEmailRegex(confirmEmail) {
  let error = {}
  const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/

  if (confirmEmail.email === "") {
    error.email = "This field cannot be left blank"
  }
  else if (!emailPattern.test(confirmEmail.email)) {
    error.email = "Please input a valid Email"
  }
  else {
    error.email = ""
  }
  return error
}

//used for settings.jsx, /changeusername
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

//used for settings.jsx, /deleteaccount
export function deleteAccountRegex(deleteAccount) {
  let error = {}
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

//used for settings.jsx, /changepassword
export function checkPasswordRegex(newPassword) {
  let error = {}
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

//used for /createaccount
export function regVerification(regDetails) {
  let error = {} 
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
