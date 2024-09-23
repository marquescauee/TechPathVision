const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/g

export const isValidEmail = (email: string) => {
  return !!(email.trim() || email.match(EMAIL_REGEX))
}
