/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdatedUser } from '../interfaces/User'
import { UserData } from '../interfaces/UserData'
import { BASE_BACKEND_URL } from './settings'

export type UpdateUserResponse = UserData | { error: string }

export const updateUserRequest = async (
  userData: UpdatedUser,
  token: string
): Promise<UpdateUserResponse> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/update-user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail)
    }

    const data: UserData = await response.json()
    return data
  } catch (e) {
    return { error: 'A senha atual é inválida.' }
  }
}
