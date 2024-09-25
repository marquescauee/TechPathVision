import { Attribute } from '../interfaces/Attribute'
import { BASE_BACKEND_URL } from './settings'

export const sendProfileRequest = async (profile: Attribute[]) => {
  const response = await fetch(`${BASE_BACKEND_URL}/map-careers`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  })
  if (!response.ok) {
    return 'Falha ao obter carreiras compatíveis com o perfil.'
  }

  return await response.json()
}
