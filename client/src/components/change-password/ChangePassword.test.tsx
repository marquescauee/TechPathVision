import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChangePassword from './ChangePassword'
import { useAuth } from '../../contexts/useAuth'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../contexts/useAuth')

const renderChangePassword = () => {
  const mockChangePassword = vi.fn()
  const mockLogin = vi.fn()

  ;(useAuth as jest.Mock).mockReturnValue({
    changePassword: mockChangePassword,
    login: mockLogin
  })

  return {
    ...render(<ChangePassword />),
    mockChangePassword,
    mockLogin
  }
}

describe('ChangePassword Component', () => {
  const mockChangePassword = vi.fn()
  const mockLogin = vi.fn()

  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({
      changePassword: mockChangePassword,
      login: mockLogin
    })
    vi.clearAllMocks()
  })

  it('should render the change password form', () => {
    renderChangePassword()

    expect(screen.getByPlaceholderText(/Digite sua senha/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Confirme sua senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('should show an error if new password is invalid', async () => {
    renderChangePassword()

    fireEvent.change(screen.getByPlaceholderText(/Digite sua senha/i), {
      target: { value: 'short' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Confirme sua senha/i), {
      target: { value: 'short' }
    })

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(
      await screen.queryAllByText(/A senha deve ter entre 8 e 16 caracteres./i)[0]
    ).toBeInTheDocument()
  })

  it('should show an error if passwords do not match', async () => {
    renderChangePassword()

    fireEvent.change(screen.getByPlaceholderText(/Digite sua senha/i), {
      target: { value: 'ValidPassword1' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Confirme sua senha/i), {
      target: { value: 'DifferentPassword1' }
    })

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByText(/As senhas não são iguais./i)).toBeInTheDocument()
  })

  it('should show an error message if changePassword returns an error', async () => {
    const { mockChangePassword } = renderChangePassword()

    mockChangePassword.mockResolvedValueOnce({ error: 'Erro ao redefinir senha.' })

    fireEvent.change(screen.getByPlaceholderText(/Digite sua senha/i), {
      target: { value: 'ValidPassword1' }
    })
    fireEvent.change(screen.getByPlaceholderText(/Confirme sua senha/i), {
      target: { value: 'ValidPassword1' }
    })

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByText(/Erro ao redefinir senha./i)).toBeInTheDocument()
  })
})
