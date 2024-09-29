import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAuth } from '../../contexts/useAuth'
import Register from './Register'
import { vi } from 'vitest'

vi.mock('../../contexts/useAuth')

const mockRegister = vi.fn()

describe('Register Component', () => {
  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({ register: mockRegister })
    render(<Register />)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the registration form', () => {
    expect(screen.getByText(/CADASTRE-SE/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Senha:/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /CADASTRAR/i })).toBeInTheDocument()
  })

  it('should display error message for invalid name', async () => {
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'a' } })
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: 'Password1' } })
    fireEvent.click(screen.getByRole('button', { name: /CADASTRAR/i }))

    expect(screen.getByText(/Nome inválido./i)).toBeInTheDocument()
  })

  it('should display error message for invalid email', async () => {
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Valid Name' } })
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'invalid-email@email.c' }
    })
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: 'Password1' } })
    fireEvent.click(screen.getByRole('button', { name: /CADASTRAR/i }))

    expect(screen.getByText(/Email inválido./i)).toBeInTheDocument()
  })

  it('should display error message for invalid password', async () => {
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Valid Name' } })
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: 'short' } })
    fireEvent.click(screen.getByRole('button', { name: /CADASTRAR/i }))

    expect(screen.getByText(/A senha deve ter entre 8 e 16 caracteres./i)).toBeInTheDocument()
  })

  it('should call register with correct data', async () => {
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Valid Name' } })
    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: 'Password1' } })
    fireEvent.click(screen.getByRole('button', { name: /CADASTRAR/i }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        first_name: 'Valid Name',
        email: 'test@example.com',
        password: 'Password1'
      })
    })
  })
})
