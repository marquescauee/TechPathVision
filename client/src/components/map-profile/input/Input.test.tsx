/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './Input'
import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../../contexts/useAttributesContext')

describe('Input Component', () => {
  const setSelectedAttributes = vi.fn()

  const renderInput = (selectedAttributes: any = []) => {
    const mockContext = {
      selectedAttributes,
      setSelectedAttributes
    }
    ;(useAttributesContext as any).mockReturnValue(mockContext)
    render(<Input />)
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the input field and description', () => {
    renderInput()
    expect(
      screen.getByPlaceholderText(/escreva aqui alguns atributos sobre você/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/quanto mais atributos, melhor para mapear carreiras compatíveis com você/i)
    ).toBeInTheDocument()
  })

  it('should add an attribute when Enter is pressed', () => {
    renderInput()
    const input = screen.getByPlaceholderText(
      /escreva aqui alguns atributos sobre você/i
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Novo Atributo' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(setSelectedAttributes).toHaveBeenCalledWith(expect.any(Function))
    expect(setSelectedAttributes).toHaveBeenCalledTimes(1)
  })

  it('should not add duplicate attributes', () => {
    renderInput([{ label: 'Atributo Único', value: 'ATRIBUTO UNICO' }])
    const input = screen.getByPlaceholderText(
      /escreva aqui alguns atributos sobre você/i
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'ATRIBUTO UNICO' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(setSelectedAttributes).toHaveBeenCalledTimes(0)
  })

  it('should reset input value after adding an attribute', () => {
    renderInput()
    const input = screen.getByPlaceholderText(
      /escreva aqui alguns atributos sobre você/i
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Atributo Teste' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(input.value).toBe('')
  })
})
