import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomeTitle from './HomeTitle'

describe('HomeTitle Component', () => {
  it('should render the title text', () => {
    render(<HomeTitle />)

    const titleElement = screen.getByText(/Tech Path Vision/i)
    expect(titleElement).toBeInTheDocument()
  })

  it('should render the horizontal line', () => {
    render(<HomeTitle />)

    const horizontalLine = screen.getByTestId('horizontal-line')
    expect(horizontalLine).toBeInTheDocument()
  })
})
