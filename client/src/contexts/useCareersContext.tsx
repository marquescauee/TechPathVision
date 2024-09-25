import React, { createContext, useContext, useState } from 'react'
import { Career } from '../interfaces/Career'
import { sendProfileRequest } from '../routes/careers'
import { Attribute } from '../interfaces/Attribute'

interface CareersContextType {
  mappedCareers: Career[]
  setMappedCareers: React.Dispatch<React.SetStateAction<Career[]>>
  sendProfile: (profile: Attribute[]) => Promise<{ error?: string }>
}

const CareersContext = createContext<CareersContextType | undefined>(undefined)

interface CareersProviderProps {
  children: React.ReactNode
}

export const CareersProvider: React.FC<CareersProviderProps> = ({ children }) => {
  const [mappedCareers, setMappedCareers] = useState<Career[]>([])

  const sendProfile = async (profile: Attribute[]): Promise<{ error?: string }> => {
    const data = await sendProfileRequest(profile)

    if (data.error) {
      return { error: data.error }
    }

    return {}
  }

  return (
    <CareersContext.Provider
      value={{
        mappedCareers,
        setMappedCareers,
        sendProfile
      }}>
      {children}
    </CareersContext.Provider>
  )
}

export const useCareersContext = () => {
  const context = useContext(CareersContext)
  if (!context) {
    throw new Error('useCareers must be used within an CareersProvider')
  }
  return context
}
