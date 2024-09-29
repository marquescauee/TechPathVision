import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useNavigate } from 'react-router-dom'
import StartButton from './StartButton'
import { describe, it, expect, vi } from 'vitest'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

describe('StartButton Component', () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the start button with correct text', () => {
    render(<StartButton />)

    const buttonElement = screen.getByText(/Comece sua jornada/i)
    expect(buttonElement).toBeInTheDocument()
  })

  it('should have horizontal lines rendered', () => {
    const { container } = render(<StartButton />)

    const horizontalLines = container.getElementsByClassName('start-button-horizontal-line')
    expect(horizontalLines.length).toBe(2)

    Array.from(horizontalLines).forEach((line) => {
      expect(line).toBeInTheDocument()
    })
  })

  it('should navigate to /map-profile when button is clicked', () => {
    render(<StartButton />)

    const buttonElement = screen.getByText(/Comece sua jornada/i)
    fireEvent.click(buttonElement)

    expect(mockNavigate).toHaveBeenCalledWith('/map-profile')
  })
})
