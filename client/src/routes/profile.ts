import { Attribute } from '../interfaces/Attribute'
import { BASE_BACKEND_URL } from './settings'

export const getAttributesRequest = async (): Promise<Attribute[]> => {
  const response = await fetch(`${BASE_BACKEND_URL}/get-attributes`)
  if (!response.ok) {
    throw new Error('Falhar ao recuperar atributos.')
  }
  return (await response.json()) as Attribute[]
}
