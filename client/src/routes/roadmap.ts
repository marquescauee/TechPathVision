import { Roadmap } from '../interfaces/Roadmap'
import { BASE_BACKEND_URL } from './settings'

export const saveRoadmapRequest = async (token: string, roadmap: Roadmap) => {
  const response = await fetch(`${BASE_BACKEND_URL}/save-roadmap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({ roadmap: roadmap, token: token })
  })
  if (!response.ok) {
    return 'Falha ao salvar o roadmap.'
  }

  return await response.json()
}

export const generateRoadmapRequest = async (careerTitle: string) => {
  const response = await fetch(`${BASE_BACKEND_URL}/generate-roadmap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: careerTitle })
  })
  if (!response.ok) {
    return { error: 'Falha ao gerar o roadmap.' }
  }

  return await response.json()
}

export const getRoadmapsRequest = async (
  token: string,
  email: string
): Promise<{ error: string } | Roadmap[]> => {
  const response = await fetch(
    `${BASE_BACKEND_URL}/get-roadmaps?email=${encodeURIComponent(email)}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    }
  )

  if (!response.ok) {
    return { error: 'Falha ao recuperar roadmaps.' }
  }

  return await response.json()
}
