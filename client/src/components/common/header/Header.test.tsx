import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header'
import { useAuth } from '../../../contexts/useAuth'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../../contexts/useAuth')

describe('Header Component', () => {
  const mockLogout = vi.fn()
  const mockGetCredentials = vi.fn()

  beforeEach(() => {
    ;(useAuth as jest.Mock).mockReturnValue({
      logout: mockLogout,
      getCredentials: mockGetCredentials
    })
    vi.clearAllMocks()
  })

  it('should render the login button when not logged in', () => {
    mockGetCredentials.mockReturnValue({ token: null, user: null })
    render(<Header />)

    expect(screen.getByTestId('login-redirect-wrapper')).toBeInTheDocument()
    expect(screen.queryByText(/Olá,/i)).not.toBeInTheDocument()
  })

  it('should display user name when logged in', () => {
    mockGetCredentials.mockReturnValue({
      token: 'mockToken',
      user: { first_name: 'John Doe' }
    })
    render(<Header />)

    expect(screen.getByText(/Olá, John!/i)).toBeInTheDocument()
  })

  it('should call logout when clicking on Sair', () => {
    mockGetCredentials.mockReturnValue({
      token: 'mockToken',
      user: { first_name: 'John Doe' }
    })
    render(<Header />)

    fireEvent.click(screen.getByText(/Sair/i))
    expect(mockLogout).toHaveBeenCalled()
  })

  it('should not display the dropdown when not logged in', () => {
    mockGetCredentials.mockReturnValue({ token: null, user: null })
    render(<Header />)

    expect(screen.queryByRole('dropdown-menu')).not.toBeInTheDocument()
  })
})
