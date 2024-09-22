export interface UserData {
  token: string
  user: {
    first_name: string
    email: string
    password?: string
  }
}
