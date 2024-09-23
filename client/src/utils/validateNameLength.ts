export const validateNameLength = (name: string) => {
  return !name.trim() || name.length < 2
}
