export const validatePasswordLength = (password: string) => {
  return !password.trim() || password.length < 8 || password.length > 16
}
