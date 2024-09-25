import { Roadmap } from '../interfaces/Roadmap'
import { BASE_BACKEND_URL } from './settings'

export const saveRoadmapRequest = async (token: string, roadmap: Roadmap): Promise<string> => {
  const response = await fetch(`${BASE_BACKEND_URL}/save-roadmap`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(roadmap)
  })
  if (!response.ok) {
    return 'Falha ao salvar o roadmap.'
  }

  return await response.json()
}
