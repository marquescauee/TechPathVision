/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SuggestedAttributes from './SuggestedAttributes'
import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../../contexts/useAttributesContext')

describe('SuggestedAttributes Component', () => {
  const setSelectedAttributes = vi.fn()

  const renderSuggestedAttributes = (
    suggestedAttributes: any = [],
    selectedAttributes: any = []
  ) => {
    ;(useAttributesContext as any).mockReturnValue({
      suggestedAttributes,
      setSelectedAttributes,
      selectedAttributes
    })
    render(<SuggestedAttributes />)
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render suggested attributes', () => {
    const attributes = [{ value: 'ATTRIBUTE 1', label: 'Attribute 1' }]
    renderSuggestedAttributes(attributes)

    expect(screen.getByText(/ATTRIBUTE 1/i)).toBeInTheDocument()
  })

  it('should call setSelectedAttributes when an attribute is added', () => {
    const attributes = [{ value: 'ATTRIBUTE 1', label: 'Attribute 1' }]
    renderSuggestedAttributes(attributes)

    fireEvent.click(screen.getByText(/ATTRIBUTE 1/i))

    expect(setSelectedAttributes).toHaveBeenCalledWith(expect.any(Function))

    const updateFunction = setSelectedAttributes.mock.calls[0][0]
    const newSelectedAttributes = updateFunction([])
    expect(newSelectedAttributes).toEqual([attributes[0]])
  })

  it('should not add an attribute if it is already selected', () => {
    const attributes = [{ value: 'ATTRIBUTE 1', label: 'Attribute 1' }]
    renderSuggestedAttributes(attributes, attributes)

    fireEvent.click(screen.getByText(/ATTRIBUTE 1/i))

    expect(setSelectedAttributes).not.toHaveBeenCalled()
  })

  it('should add the disabled class to the corresponding button when an attribute is added', () => {
    const attributes = [{ value: 'ATTRIBUTE 1', label: 'Attribute 1' }]
    renderSuggestedAttributes(attributes)

    const suggestedButton = screen.getByText(/ATTRIBUTE 1/i)
    fireEvent.click(suggestedButton)

    expect(suggestedButton).toHaveClass('disabled')
  })
})
