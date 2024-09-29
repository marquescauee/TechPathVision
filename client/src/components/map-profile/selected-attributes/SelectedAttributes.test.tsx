/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelectedAttributes from './SelectedAttributes'
import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../../contexts/useAttributesContext')

describe('SelectedAttributes Component', () => {
  const setSelectedAttributes = vi.fn()

  const renderSelectedAttributes = (selectedAttributes: any = []) => {
    ;(useAttributesContext as any).mockReturnValue({
      selectedAttributes,
      setSelectedAttributes
    })
    render(<SelectedAttributes />)
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render selected attributes', () => {
    renderSelectedAttributes([{ value: 'ATTRIBUTE 1', label: 'Attribute 1' }])

    expect(screen.getByText(/ATTRIBUTE 1/i)).toBeInTheDocument()
  })

  it('should call setSelectedAttributes with a function that returns the new state', () => {
    const attributes = [{ value: 'ATTRIBUTE 1', label: 'Attribute 1' }]
    renderSelectedAttributes(attributes)

    fireEvent.click(screen.getByText(/ATTRIBUTE 1/i))

    expect(setSelectedAttributes).toHaveBeenCalledWith(expect.any(Function))

    const updateFunction = setSelectedAttributes.mock.calls[0][0]
    const newSelectedAttributes = updateFunction(attributes)
    expect(newSelectedAttributes).toEqual([])
  })
})
