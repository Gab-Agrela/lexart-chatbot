import { textMessages } from "./botMessages"

const validateUsername = (username) => {
  if (username.length < 6) {
    return false
  }
  return true
}

const validatePassword = (password) => {
  if (password.length < 4) {
    return false
  }
  return true
}

export const validateFields = (username, password) => {
  const isUsernameValid = validateUsername(username)
  const isPasswordValid = validatePassword(password)
  if (!isUsernameValid) {
    return textMessages["usernameInvalid"]
  }
  if (!isPasswordValid) {
    return textMessages["passwordInvalid"]
  }
}

