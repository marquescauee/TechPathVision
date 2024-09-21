import React, { createContext, useContext, useEffect, useState } from 'react'
import { Attribute } from '../interfaces/Attribute'
import { getAttributes } from '../routes/profile'

interface AttributesContextType {
  selectedAttributes: Attribute[]
  setSelectedAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>
  suggestedAttributes: Attribute[]
  setSuggestedAttributes: React.Dispatch<React.SetStateAction<Attribute[]>>
}

const AttributesContext = createContext<AttributesContextType | undefined>(undefined)

interface AttributesProviderProps {
  children: React.ReactNode
}

export const AttributesProvider: React.FC<AttributesProviderProps> = ({ children }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])
  const [suggestedAttributes, setSuggestedAttributes] = useState<Attribute[]>([])

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await getAttributes()
        setSuggestedAttributes(response)
      } catch (error) {
        console.error('Failed to fetch attributes:', error)
      }
    }
    fetchAttributes()
  }, [])

  return (
    <AttributesContext.Provider
      value={{
        selectedAttributes,
        setSelectedAttributes,
        suggestedAttributes,
        setSuggestedAttributes
      }}>
      {children}
    </AttributesContext.Provider>
  )
}

export const useAttributesContext = () => {
  const context = useContext(AttributesContext)
  if (!context) {
    throw new Error('useAttributes must be used within an AttributesProvider')
  }
  return context
}
