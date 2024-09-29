import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useCareersContext } from '../../../contexts/useCareersContext'
import { MemoryRouter } from 'react-router-dom'
import { useAuth } from '../../../contexts/useAuth'
import { vi } from 'vitest'

import RoadmapsContainer from './RoadmapsContainer'

vi.mock('../../../contexts/useCareersContext')
vi.mock('../../../contexts/useAuth')

const mockGetRoadmaps = vi.fn()
const mockGetCredentials = vi.fn()

;(useCareersContext as jest.Mock).mockReturnValue({
  getRoadmaps: mockGetRoadmaps,
  setShowSavedRoadmap: vi.fn()
})
;(useAuth as jest.Mock).mockReturnValue({
  getCredentials: mockGetCredentials
})

describe('RoadmapsContainer', () => {
  beforeEach(() => {
    mockGetCredentials.mockReturnValue({
      token: 'mockToken',
      user: { email: 'test@example.com' }
    })
    mockGetRoadmaps.mockResolvedValue([{ title: 'Roadmap 1' }, { title: 'Roadmap 2' }])
  })

  it('should render the roadmaps', async () => {
    render(
      <MemoryRouter>
        <RoadmapsContainer />
      </MemoryRouter>
    )

    await waitFor(() => expect(mockGetRoadmaps).toHaveBeenCalled())

    expect(screen.getByText(/Roadmap 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Roadmap 2/i)).toBeInTheDocument()
  })

  it('should handle roadmap click', async () => {
    const mockSetShowSavedRoadmap = vi.fn()
    ;(useCareersContext as jest.Mock).mockReturnValue({
      getRoadmaps: mockGetRoadmaps,
      setShowSavedRoadmap: mockSetShowSavedRoadmap
    })

    render(
      <MemoryRouter>
        <RoadmapsContainer />
      </MemoryRouter>
    )

    await waitFor(() => expect(mockGetRoadmaps).toHaveBeenCalled())

    fireEvent.click(screen.getByText(/Roadmap 1/i))

    expect(mockSetShowSavedRoadmap).toHaveBeenCalledWith({ title: 'Roadmap 1' })
  })

  it('should handle fetch error', async () => {
    mockGetRoadmaps.mockResolvedValueOnce({ error: true })

    render(
      <MemoryRouter>
        <RoadmapsContainer />
      </MemoryRouter>
    )

    await waitFor(() => expect(mockGetRoadmaps).toHaveBeenCalled())

    expect(screen.queryByText(/Roadmap 1/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Roadmap 2/i)).not.toBeInTheDocument()
  })
})
