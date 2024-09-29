/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState } from 'react'
import { Career } from '../interfaces/Career'
import { mapProfileRequest } from '../routes/careers'
import { Roadmap } from '../interfaces/Roadmap'
import {
  generateRoadmapRequest,
  generateSubjectContentRequest,
  getRoadmapsRequest,
  saveRoadmapRequest
} from '../routes/roadmap'

interface CareersContextType {
  mappedCareers: Career[]
  mappedRoadmap: Roadmap
  showSavedRoadmap: Roadmap
  setMappedCareers: React.Dispatch<React.SetStateAction<Career[]>>
  setMappedRoadmap: React.Dispatch<React.SetStateAction<Roadmap>>
  setShowSavedRoadmap: React.Dispatch<React.SetStateAction<Roadmap>>
  mapProfile: (profile: string[]) => Promise<{ error?: string }>
  generateRoadmap: (careerTitle: string) => Promise<{
    error?: string
  }>
  saveRoadmap(token: string, roadmap: Roadmap): Promise<{ error?: string }>
  generateSubjectContent(content: string): Promise<any>
  getRoadmaps(token: string, email: string): Promise<{ error: string } | Roadmap[]>
}

const CareersContext = createContext<CareersContextType | undefined>(undefined)

interface CareersProviderProps {
  children: React.ReactNode
}

export const CareersProvider: React.FC<CareersProviderProps> = ({ children }) => {
  const [mappedCareers, setMappedCareers] = useState<Career[]>([])
  const [showSavedRoadmap, setShowSavedRoadmap] = useState<Roadmap>({
    subjects: [],
    title: ''
  })
  const [mappedRoadmap, setMappedRoadmap] = useState<Roadmap>({
    subjects: [],
    title: ''
  })

  const mapProfile = async (profile: string[]): Promise<{ error?: string }> => {
    const data = await mapProfileRequest(profile)

    const cleanData = data.slice(3, -3)

    const formattedJson = cleanData.replace('json', '')

    if (data.error) {
      return { error: data.error }
    }

    const mappedCareersArray = JSON.parse(formattedJson)
    setMappedCareers(mappedCareersArray)

    localStorage.setItem('careers', JSON.stringify(mappedCareersArray))

    return mappedCareersArray
  }

  const generateRoadmap = async (careerTitle: string): Promise<{ error?: string }> => {
    const data = await generateRoadmapRequest(careerTitle)

    const cleanData = data.slice(3, -3)
    const formattedJson = cleanData.replace('json', '')

    if (data.error) {
      return { error: data.error }
    }

    const mappedRoadmapArray = JSON.parse(formattedJson)
    mappedRoadmapArray.title = careerTitle

    setMappedRoadmap(mappedRoadmapArray)

    localStorage.setItem('roadmap', JSON.stringify(mappedRoadmapArray))

    return mappedRoadmapArray
  }

  const saveRoadmap = async (token: string, roadmap: Roadmap): Promise<{ error?: string }> => {
    const data = await saveRoadmapRequest(token, roadmap)

    if (data.error) {
      return { error: data.error }
    }

    setMappedRoadmap(data)
    return data
  }

  const generateSubjectContent = async (content: string) => {
    const data = await generateSubjectContentRequest(content)

    if (data.error) {
      return { error: data.error }
    }

    return data
  }

  const getRoadmaps = async (
    token: string,
    email: string
  ): Promise<{ error: string } | Roadmap[]> => {
    const data = await getRoadmapsRequest(token, email)

    if ('error' in data) {
      return { error: data.error }
    }

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
        generateRoadmap,
        saveRoadmap,
        getRoadmaps,
        setShowSavedRoadmap,
        showSavedRoadmap,
        generateSubjectContent
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
