import React, { createContext, useContext, useState } from 'react'
import { Career } from '../interfaces/Career'
import { mapProfileRequest } from '../routes/careers'
import { Roadmap } from '../interfaces/Roadmap'
import { generateRoadmapRequest } from '../routes/roadmap'

interface CareersContextType {
  mappedCareers: Career[]
  mappedRoadmap: Roadmap
  setMappedCareers: React.Dispatch<React.SetStateAction<Career[]>>
  setMappedRoadmap: React.Dispatch<React.SetStateAction<Roadmap>>
  mapProfile: (profile: string[]) => Promise<{ error?: string }>
  generateRoadmap: (careerTitle: string) => Promise<{
    error?: string
  }>
}

const CareersContext = createContext<CareersContextType | undefined>(undefined)

interface CareersProviderProps {
  children: React.ReactNode
}

export const CareersProvider: React.FC<CareersProviderProps> = ({ children }) => {
  const [mappedCareers, setMappedCareers] = useState<Career[]>([])
  const [mappedRoadmap, setMappedRoadmap] = useState<Roadmap>({
    subjects: [],
    title: ''
  })

  const mapProfile = async (profile: string[]): Promise<{ error?: string }> => {
    const data = await mapProfileRequest(profile)

    if (data.error) {
      return { error: data.error }
    }

    setMappedCareers(data)
    return data
  }

  const generateRoadmap = async (careerTitle: string): Promise<{ error?: string }> => {
    const data = await generateRoadmapRequest(careerTitle)

    if (data.error) {
      return { error: data.error }
    }

    setMappedRoadmap(data)
    return data
  }

  return (
    <CareersContext.Provider
      value={{
        mappedCareers,
        setMappedCareers,
        mapProfile,
        mappedRoadmap,
        setMappedRoadmap,
        generateRoadmap
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
