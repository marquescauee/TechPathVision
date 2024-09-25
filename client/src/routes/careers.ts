import { BASE_BACKEND_URL } from './settings'

export const mapProfileRequest = async (profile: string[]) => {
  const response = await fetch(`${BASE_BACKEND_URL}/map-profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ attributes: profile })
  })
  if (!response.ok) {
    return 'Falha ao obter carreiras compatíveis com o perfil.'
  }

  return await response.json()
}
