/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../interfaces/User'
import { BASE_BACKEND_URL } from './settings'

export const changePasswordRequest = async (
  newPassword: string,
  token: string
): Promise<{ error?: string; data?: { user: { email: string; first_name: string } } }> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/password-reset-confirm/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ new_password: newPassword, token })
    })

    if (!response.ok) {
      const errorData = await response.json()
      return { error: errorData.token || errorData.new_password || 'Erro desconhecido' }
    }

    const data = await response.json()
    return { data }
  } catch (e) {
    return { error: 'Erro ao redefinir senha.' }
  }
}

export const passwordResetRequest = async (email: string): Promise<{ error?: string }> => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/password-reset-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })

    if (!response.ok) {
      return { error: await response.json() }
    }

    return {}
  } catch (e) {
    return { error: 'Erro ao enviar e-mail.' }
  }
}

export const loginRequest = async (userData: User) => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      return { error: await response.json() }
    }

    return response.json()
  } catch (e) {
    return { error: 'Erro ao realizar login' }
  }
}

export const registerRequest = async (user: User) => {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (!response.ok) {
      return { error: await response.json() }
    }

    return response.json()
  } catch (e) {
    return { error: 'Erro ao realizar cadastro' }
  }
}
