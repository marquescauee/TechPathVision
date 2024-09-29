import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import CareersFound from './CareersFound'
import { useCareersContext } from '../../contexts/useCareersContext'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Career } from '../../interfaces/Career'

type MockCareersContextType = {
  mappedCareers: Career[]
  generateRoadmap: (title: string) => Promise<{ error?: boolean }>
}

vi.mock('../../contexts/useCareersContext', () => ({
  useCareersContext: vi.fn()
}))

const mockSetLoading = vi.fn()
const mockGenerateRoadmap = vi.fn()
const careersData = [
  {
    title: 'Software Engineer',
    shortDescription: 'Develops software applications.',
    longDescription1: 'Responsible for coding, design, and architecture.',
    longDescription2: 'Description 2',
    longDescription3: 'Description 3',
    skills: ['JavaScript', 'React', 'Node.js']
  }
]

beforeEach(() => {
  ;(useCareersContext as jest.Mock).mockReturnValue({
    mappedCareers: careersData,
    generateRoadmap: mockGenerateRoadmap
  } as MockCareersContextType)
})

const renderCareersFound = () => {
  render(
    <MemoryRouter>
      <CareersFound setLoading={mockSetLoading} />
    </MemoryRouter>
  )
}

describe('CareersFound Component', () => {
  it('should render careers found', () => {
    renderCareersFound()

    expect(screen.getByText(/CARREIRAS ENCONTRADAS PARA VOCÊ!/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Software Engineer/i)[0]).toBeInTheDocument()
  })

  it('should call generateRoadmap on button click', async () => {
    mockGenerateRoadmap.mockResolvedValueOnce({})

    renderCareersFound()

    fireEvent.click(screen.getByText(/Descubra Mais/i))
    fireEvent.click(screen.getByText(/GERAR ROADMAP/i))

    await waitFor(() => {
      expect(mockGenerateRoadmap).toHaveBeenCalledWith('Software Engineer')
      expect(mockSetLoading).toHaveBeenCalledWith(true)
    })
  })

  it('should display an error message if generateRoadmap fails', async () => {
    mockGenerateRoadmap.mockResolvedValueOnce({ error: true })

    renderCareersFound()

    fireEvent.click(screen.getByText(/Descubra Mais/i))
    fireEvent.click(screen.getByText(/GERAR ROADMAP/i))

    await waitFor(() => {
      expect(screen.getByText(/Falha ao enviar atributos./i)).toBeInTheDocument()
    })
  })

  it('should display career details in modal', () => {
    renderCareersFound()

    fireEvent.click(screen.getByText(/Descubra Mais/i))

    expect(
      screen.getByText(/Responsible for coding, design, and architecture./i)
    ).toBeInTheDocument()
    expect(screen.getByText(/Habilidades Envolvidas:/i)).toBeInTheDocument()
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument()
  })
})
