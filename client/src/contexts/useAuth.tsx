import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  changePasswordRequest,
  loginRequest,
  passwordResetRequest,
  registerRequest
} from '../routes/auth'
import { UpdatedUser, User } from '../interfaces/User'
import { updateUserRequest, UpdateUserResponse } from '../routes/myAccount'

interface LocalStorageItems {
  token: string
  user: {
    email: string
    first_name: string
  }
}

interface AuthContextType {
  user: User | null
  token: string | null
  setCredentials: (user: User, token?: string) => void
  register: (user: User) => Promise<{
    error?: string
  }>
  login: (user: User) => Promise<{
    error?: string
  }>
  requestResetPassword: (email: string) => Promise<{ error?: string }>
  changePassword: (
    newPassword: string,
    token: string
  ) => Promise<{ error?: string; data?: { user: { email: string; first_name: string } } }>
  logout: () => void
  getCredentials: () => LocalStorageItems
  updateUser: (user: UpdatedUser) => Promise<UpdateUserResponse | { error: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  const setCredentials = (user: User, token?: string) => {
    if (token) {
      setToken(token)
      localStorage.setItem('token', token)
    }

    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const getCredentials = () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')

    if (!token || !user) return { token: '', user }

    return { token, user } as LocalStorageItems
  }

  const register = async (user: User): Promise<{ error?: string }> => {
    const data = await registerRequest(user)

    if (data.error) {
      return { error: 'Erro ao realizar login' }
    }

    setCredentials(
      {
        email: data.user.email,
        first_name: data.user.first_name
      },
      data.token
    )

    navigate('/my-profile')

    return {}
  }

  const login = async (userData: User): Promise<{ error?: string }> => {
    const data = await loginRequest(userData)

    if (data.error) {
      return { error: 'Erro ao realizar login' }
    }

    setCredentials(
      {
        email: data.user.email,
        first_name: data.user.first_name
      },
      data.token
    )

    navigate('/my-profile')

    return {}
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  const requestResetPassword = async (email: string): Promise<{ error?: string }> => {
    return passwordResetRequest(email)
  }

  const changePassword = async (
    newPassword: string,
    token: string
  ): Promise<{ error?: string; data?: { user: { email: string; first_name: string } } }> => {
    return changePasswordRequest(newPassword, token)
  }

  const updateUser = async (
    userData: UpdatedUser
  ): Promise<UpdateUserResponse | { error: string }> => {
    const token = getCredentials().token

    const data: UpdateUserResponse = await updateUserRequest(userData, token)

    if ('error' in data) {
      return { error: data.error }
    }

    setCredentials({
      email: data.user.email,
      first_name: data.user.first_name
    })

    return data
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setCredentials,
        register,
        logout,
        login,
        getCredentials,
        requestResetPassword,
        changePassword,
        updateUser
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
