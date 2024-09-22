/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { BASE_BACKEND_URL } from '../routes/settings'
import { UserData } from '../interfaces/UserData'
import { useNavigate } from 'react-router-dom'

interface User {
  email: string
  first_name?: string
  password?: string
}

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
  setTokens: (token: string, user: User) => void
  register: (user: User) => Promise<{
    error?: string
  }>
  login: (user: User) => Promise<{
    error?: string
  }>
  logout: () => void
  getTokens: () => LocalStorageItems
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const navigate = useNavigate()

  const setTokens = (token: string, user: User) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const getTokens = () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') ?? '{}')

    if (!token || !user) return { token: '', user }

    return { token, user } as LocalStorageItems
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

      setTokens(data.token, {
        email: data.user.email,
        first_name: data.user.first_name
      })

      navigate('/')

      return {}
    } catch (e) {
      return { error: 'Erro ao realizar cadastro' }
    }
  }

  const login = async (userData: User): Promise<{ error?: string }> => {
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

      const data: UserData = await response.json()

      setTokens(data.token, {
        email: data.user.email,
        first_name: data.user.first_name
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
    <AuthContext.Provider value={{ user, token, setTokens, register, logout, login, getTokens }}>
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
