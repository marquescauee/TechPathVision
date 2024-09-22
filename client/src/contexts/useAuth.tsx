/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState } from 'react'
import { BASE_BACKEND_URL } from '../routes/settings'
import { UserData } from '../interfaces/UserData'
import { useNavigate } from 'react-router-dom'

interface User {
  email: string
  first_name?: string
  password?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  setTokens: (userData: { token: string; user: User }) => void
  register: (user: User) => Promise<{
    error?: string
  }>
  login: (user: User) => Promise<{
    error?: string
  }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  const setTokens = (userData: { token: string; user: User }) => {
    setUser(userData.user)
    setToken(userData.token)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('user', JSON.stringify(userData.user))
  }

  const register = async (user: User): Promise<{ error?: string }> => {
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

      const data: UserData = await response.json()

      setTokens({
        token: data.token,
        user: {
          email: user.email,
          first_name: user.first_name
        }
      })

      navigate('/')

      return {}
    } catch (e) {
      return { error: 'Erro ao realizar cadastro' }
    }
  }

  const login = async (user: User): Promise<{ error?: string }> => {
    try {
      const response = await fetch(`${BASE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (!response.ok) {
        return { error: await response.json() }
      }

      const data: UserData = await response.json()
      setTokens({
        token: data.token,
        user: {
          email: data.user.email,
          first_name: data.user.first_name
        }
      })

      navigate('/')

      return {}
    } catch (e) {
      return { error: 'Erro ao realizar login' }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, setTokens, register, logout, login }}>
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
