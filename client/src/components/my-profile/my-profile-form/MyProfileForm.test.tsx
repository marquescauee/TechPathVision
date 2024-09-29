import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MyProfileForm from './MyProfileForm'
import { useAuth } from '../../../contexts/useAuth'
import { vi } from 'vitest'

vi.mock('../../../contexts/useAuth', () => ({
  useAuth: vi.fn()
}))

const mockGetCredentials = vi.fn()
const mockUpdateUser = vi.fn()

beforeEach(() => {
  ;(useAuth as jest.Mock).mockReturnValue({
    getCredentials: () => ({ user: { first_name: 'John', email: 'john@example.com' } }),
    updateUser: mockUpdateUser
  })
})

const renderMyProfileForm = () => {
  render(<MyProfileForm />)
}

describe('MyProfileForm Component', () => {
  it('should render the form with initial values', () => {
    renderMyProfileForm()

    expect(screen.getByLabelText(/Nome:/i)).toHaveValue('John')
    expect(screen.getByLabelText(/Email:/i)).toBeDisabled()
    expect(screen.getByLabelText(/Email:/i)).toHaveValue('john@example.com')
  })

  it('should show an error message for invalid name', async () => {
    mockGetCredentials.mockReturnValueOnce({
      user: { first_name: 'John', email: 'john@example.com' }
    })
    renderMyProfileForm()

    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'A' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByText(/Nome inválido./i)).toBeInTheDocument()
  })

  it('should show an error message if the current password is wrong', async () => {
    mockUpdateUser.mockResolvedValueOnce({ error: true })
    renderMyProfileForm()

    fireEvent.change(screen.getByLabelText(/Senha atual:/i), { target: { value: 'wrongPassword' } })
    fireEvent.change(screen.getByLabelText(/Nova senha:/i), { target: { value: 'NewPassword1' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(await screen.findByText(/A senha atual é inválida./i)).toBeInTheDocument()
  })

  it('should call updateUser on form submission', async () => {
    mockUpdateUser.mockResolvedValueOnce({})
    renderMyProfileForm()

    fireEvent.change(screen.getByLabelText(/Senha atual:/i), {
      target: { value: 'CurrentPassword' }
    })
    fireEvent.change(screen.getByLabelText(/Nova senha:/i), { target: { value: 'NewPassword1' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        first_name: 'John',
        current_password: 'CurrentPassword',
        new_password: 'NewPassword1'
      })
    })

    expect(screen.getByText(/Dados atualizados com sucesso!/i)).toBeInTheDocument()
  })

  it('should show loading spinner while updating', () => {
    renderMyProfileForm()

    fireEvent.change(screen.getByLabelText(/Senha atual:/i), {
      target: { value: 'CurrentPassword' }
    })
    fireEvent.change(screen.getByLabelText(/Nova senha:/i), { target: { value: 'NewPassword1' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByTestId('spinner-wrapper')).toBeInTheDocument()
  })

  it('should call updateUser on form submission', async () => {
    mockUpdateUser.mockResolvedValueOnce({})
    renderMyProfileForm()

    fireEvent.change(screen.getByLabelText(/Senha atual:/i), {
      target: { value: 'CurrentPassword' }
    })
    fireEvent.change(screen.getByLabelText(/Nova senha:/i), { target: { value: 'NewPassword1' } })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith({
        first_name: 'John',
        current_password: 'CurrentPassword',
        new_password: 'NewPassword1'
      })
    })

    expect(screen.getByText(/Dados atualizados com sucesso!/i)).toBeInTheDocument()
  })
})
