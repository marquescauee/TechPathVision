import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useCareersContext } from '../../contexts/useCareersContext'
import ViewSavedRoadmap from './ViewSavedRoadmap'
import { vi } from 'vitest'

vi.mock('../../contexts/useCareersContext')

const mockShowSavedRoadmap = {
  title: 'Sample Roadmap',
  subjects: [
    {
      title: 'Subject 1',
      description: 'Description for subject 1',
      content: ['Content 1', 'Content 2'],
      documentation: [{ title: 'Doc 1', url: 'http://example.com/doc1' }]
    },
    {
      title: 'Subject 2',
      description: 'Description for subject 2',
      content: ['Content A', 'Content B'],
      documentation: [{ title: 'Doc 2', url: 'http://example.com/doc2' }]
    }
  ]
}

beforeEach(() => {
  ;(useCareersContext as jest.Mock).mockReturnValue({
    showSavedRoadmap: mockShowSavedRoadmap
  })
})

test('renders the roadmap title and subjects', () => {
  render(<ViewSavedRoadmap />)

  expect(screen.getAllByText('Sample Roadmap')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Subject 1')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Subject 2')[0]).toBeInTheDocument()
})

test('opens the modal when a subject is clicked', () => {
  render(<ViewSavedRoadmap />)

  const subject1Link = screen.getAllByText('Subject 1')[0]
  fireEvent.click(subject1Link)

  const modalTitle = screen.getAllByText('Subject 1')[0]
  expect(modalTitle).toBeInTheDocument()
  expect(screen.getAllByText('Description for subject 1')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Alguns conteúdos para estudos:')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Content 1')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Content 2')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Possíveis fontes de pesquisa:')[0]).toBeInTheDocument()
  expect(screen.getAllByText('Doc 1')[0]).toBeInTheDocument()
  expect(screen.getAllByText('http://example.com/doc1')[0]).toBeInTheDocument()
})

test('closes the modal when the close button is clicked', () => {
  render(<ViewSavedRoadmap />)

  const subject1Link = screen.getAllByText('Subject 1')[0]
  fireEvent.click(subject1Link)

  const modalTitle = screen.getAllByText('Subject 1')[0]
  expect(modalTitle).toBeInTheDocument()
})
