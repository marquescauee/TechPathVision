import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useAuth } from '../../contexts/useAuth'
import { useCareersContext } from '../../contexts/useCareersContext'
import ViewRoadmap from './ViewRoadmap'
import { vi } from 'vitest'

vi.mock('../../contexts/useAuth')
vi.mock('../../contexts/useCareersContext')
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))

const mockSaveRoadmap = vi.fn()
const mockGenerateSubjectContent = vi.fn()
const mockGetCredentials = vi.fn()

const mockMappedRoadmap = {
  title: 'Sample Roadmap',
  subjects: [
    {
      title: 'Subject 1',
      description: 'Description for subject 1',
      content: ['Content 1', 'Content 2'],
      documentation: [{ title: 'Doc 1', url: 'http://example.com/doc1' }]
    }
  ]
}

beforeEach(() => {
  ;(useAuth as jest.Mock).mockReturnValue({
    getCredentials: mockGetCredentials,
    saveRoadmap: mockSaveRoadmap,
    mappedRoadmap: mockMappedRoadmap,
    generateSubjectContent: mockGenerateSubjectContent
  })
  ;(useCareersContext as jest.Mock).mockReturnValue({
    saveRoadmap: mockSaveRoadmap,
    mappedRoadmap: mockMappedRoadmap,
    generateSubjectContent: mockGenerateSubjectContent
  })

  mockGetCredentials.mockReturnValue({ token: 'mock-token' })

  localStorage.clear()
})

test('renders the roadmap title and subjects', () => {
  render(<ViewRoadmap />)

  expect(screen.getByText('Sample Roadmap')).toBeInTheDocument()

  const subjects = screen.getAllByText('Subject 1')
  expect(subjects.length).toBeGreaterThan(0)
  expect(subjects[0]).toBeInTheDocument()
})

test('shows loading spinner while generating content', async () => {
  mockGenerateSubjectContent.mockResolvedValueOnce('Generated content')

  render(<ViewRoadmap />)

  fireEvent.click(screen.getByText('Content 1'))

  expect(screen.getByText('Subject 1')).toBeInTheDocument()

  fireEvent.click(screen.getByText('Content 1'))

  expect(await screen.findByText('Generated content')).toBeInTheDocument()
})

test('shows success message when roadmap is saved', async () => {
  mockSaveRoadmap.mockResolvedValueOnce({ success: true })

  render(<ViewRoadmap />)

  fireEvent.click(screen.getByText('SALVAR ROADMAP'))

  await waitFor(() => {
    expect(screen.getByText('Roadmap salvo com sucesso!')).toBeInTheDocument()
  })
})

test('shows error message when saving roadmap fails', async () => {
  mockSaveRoadmap.mockResolvedValueOnce({ error: true })

  render(<ViewRoadmap />)

  fireEvent.click(screen.getByText('SALVAR ROADMAP'))

  await waitFor(() => {
    expect(screen.getByText('Falha ao salvar roadmap')).toBeInTheDocument()
  })
})
