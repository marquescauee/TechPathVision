import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAuth } from '../../contexts/useAuth'
import ForgotPassword from './ForgotPassword'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../contexts/useAuth')

describe('ForgotPassword Component', () => {
  const mockRequestResetPassword = vi.fn()

  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({
      requestResetPassword: mockRequestResetPassword
    })
    vi.clearAllMocks()
  })

  it('should render the forgot password form', () => {
    render(<ForgotPassword />)
    expect(screen.getByText(/RECUPERAR SENHA/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite seu e-mail/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('should handle email input change', () => {
    render(<ForgotPassword />)
    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput).toHaveValue('test@example.com')
  })

  it('should display loading spinner when submitting', async () => {
    render(<ForgotPassword />)
    mockRequestResetPassword.mockResolvedValueOnce({})
    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(submitButton)
    expect(screen.getByText(/RECUPERAR SENHA/i)).toBeInTheDocument()
    expect(submitButton).not.toBeInTheDocument()
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /enviar/i })).not.toBeInTheDocument()
    })
  })

  it('should display success message on successful request', async () => {
    render(<ForgotPassword />)
    mockRequestResetPassword.mockResolvedValueOnce({})
    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(
        screen.getByText(/E-mail enviado com sucesso! Verifique sua caixa de entrada/i)
      ).toBeInTheDocument()
    })
  })

  it('should display error message on failed request', async () => {
    render(<ForgotPassword />)
    mockRequestResetPassword.mockResolvedValueOnce({ error: 'Failed to send email.' })
    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    const submitButton = screen.getByRole('button', { name: /enviar/i })
    fireEvent.click(submitButton)
    await waitFor(() => {
      expect(screen.getByText(/Failed to send email./i)).toBeInTheDocument()
    })
  })
})
