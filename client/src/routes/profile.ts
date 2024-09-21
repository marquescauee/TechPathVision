import { Attribute } from '../interfaces/Attribute'
import { BASE_BACKEND_URL } from './settings'

export const getAttributes = async (): Promise<Attribute[]> => {
  const response = await fetch(`${BASE_BACKEND_URL}/get-attributes`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return (await response.json()) as Attribute[]
}
