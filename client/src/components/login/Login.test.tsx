/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAuth } from '../../contexts/useAuth'
import Login from './Login'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../contexts/useAuth')

describe('Login Component', () => {
  const mockLogin = vi.fn()

  beforeEach(() => {
    ;(useAuth as any).mockReturnValue({ login: mockLogin })
  })

  it('should display error message for invalid email', async () => {
    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText(/digite seu e-mail/i), {
      target: { value: 'invalid-email@teste.c' }
    })
    fireEvent.change(screen.getByPlaceholderText(/digite sua senha/i), {
      target: { value: 'validPassword123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument()
    })
  })

  it('should call login function with correct data', async () => {
    mockLogin.mockResolvedValueOnce({ error: false })
    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText(/digite seu e-mail/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/digite sua senha/i), {
      target: { value: 'validPassword123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'validPassword123'
    })
  })

  it('should display error message when login fails', async () => {
    mockLogin.mockResolvedValueOnce({ error: true })
    render(<Login />)

    fireEvent.change(screen.getByPlaceholderText(/digite seu e-mail/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText(/digite sua senha/i), {
      target: { value: 'wrongPassword' }
    })
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(screen.getByText(/usuário e\/ou senha inválidos/i)).toBeInTheDocument()
    })
  })
})
