export function checkResetPasswordRegex(newPassword) {
  let error = {}
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
  if (newPassword.firstField === "") {
    error.firstField = "This field cannot be blank"
  } 
  else if (!passwordPattern.test(newPassword.firstField)) {
    error.firstField = "Make sure your new password contains numbers, capital, and lowercase characters"
  }
  else {
    error.firstField = ""
  }
  if (newPassword.secondField == "") {
    error.secondField = "This field cannot be blank"
  }
  else if (!passwordPattern.test(newPassword.secondField)) {
    error.secondField = "Make sure your new password contains numbers, capital, and lowercase characters"
  }
  else if (newPassword.firstField !== newPassword.secondField) {
    error.firstField = "Make sure both passwords match"
    error.secondField = "Make sure both passwords match"
  }
  else {
    error.secondField = ""
  }
  return error
}