import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoadingPage from './LoadingPage'

describe('LoadingPage Component', () => {
  it('should render loading message for map-profile', () => {
    render(<LoadingPage component="map-profile" />)

    expect(
      screen.getByText(
        /Estamos mapeando carreiras compatíveis com os seus atributos e interesses!/i
      )
    ).toBeInTheDocument()
    expect(screen.getByText(/Isso pode levar alguns minutos.../i)).toBeInTheDocument()
  })

  it('should render loading message for generate-roadmap', () => {
    render(<LoadingPage component="generate-roadmap" />)

    expect(
      screen.getByText(/Estamos gerando o roadmap para a carreira selecionada!/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Isso pode levar alguns minutos.../i)).toBeInTheDocument()
  })

  it('should render loading boxes', () => {
    const { container } = render(<LoadingPage component="map-profile" />)

    const boxes = container.getElementsByClassName('box')
    expect(boxes.length).toBe(4)

    Array.from(boxes).forEach((box) => {
      expect(box).toBeInTheDocument()
    })
  })
})
