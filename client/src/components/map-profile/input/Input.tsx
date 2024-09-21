import { useEffect, useState } from 'react'
import './Input.css'
import { useAttributesContext } from '../../../contexts/useAttributesContext'

const Input = () => {
  const { selectedAttributes, setSelectedAttributes } = useAttributesContext()
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleAddAttribute = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement
      const newAttribute = {
        label: inputElement.value.toUpperCase(),
        value: inputElement.value,
        classNumber: (selectedAttributes.length % 3) + 1
      }

      const alreadyAdded = selectedAttributes.find(
        (currentAttribute) => currentAttribute.value === newAttribute.value
      )

      if (alreadyAdded) return

      setSelectedAttributes((prevSelected) => [...(prevSelected || []), newAttribute])
    }
  }

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024)
  }, [])

  return (
    <div className="input-wrapper">
      <input
        className="input"
        type="text"
        placeholder={`Escreva aqui alguns atributos sobre você ${!isMobile ? 'ou interesses' : ''}`}
        onKeyDown={handleAddAttribute}
      />
      <div className="input-description">
        Quanto mais atributos, melhor para mapear carreiras compatíveis com você.
      </div>
    </div>
  )
}

export default Input
