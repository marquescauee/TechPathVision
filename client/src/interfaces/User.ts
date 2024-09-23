export interface User {
  email: string
  first_name?: string
  password?: string
}

export interface UpdatedUser {
  first_name: string
  current_password: string
  new_password: string
}
