const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/g

export const isInvalidEmail = (email: string) => {
  return !email.trim() || !email.match(EMAIL_REGEX)
}
