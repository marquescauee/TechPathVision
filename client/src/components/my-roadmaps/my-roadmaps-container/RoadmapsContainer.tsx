import { useEffect, useState } from 'react'
import { Roadmap } from '../../../interfaces/Roadmap'
import { useCareersContext } from '../../../contexts/useCareersContext'
import { useAuth } from '../../../contexts/useAuth'
import './RoadmapsContainer.css'
import { useNavigate } from 'react-router-dom'

const RoadmapsContainer = () => {
  const { getRoadmaps } = useCareersContext()
  const { getCredentials } = useAuth()
  const { setShowSavedRoadmap } = useCareersContext()

  const navigate = useNavigate()
  const [userRoadmaps, setUserRoadmaps] = useState<Roadmap[]>([])

  const handleViewRoadmap = (roadmap: Roadmap) => {
    setShowSavedRoadmap(roadmap)
    navigate('/view-roadmap')
  }

  useEffect(() => {
    const fetchRoadmaps = async () => {
      const token = getCredentials().token
      const email = getCredentials().user.email

      const response = await getRoadmaps(token, email)

      if ('error' in response) {
        setUserRoadmaps([])
        return
      }

      setUserRoadmaps(response)
    }

    fetchRoadmaps()
  }, [])

  return (
    <div className="roadmaps-container">
      {userRoadmaps.map((roadmap, index) => {
        const imageIndex = (index % 5) + 1
        return (
          <a
            key={roadmap.title}
            href={'#'}
            onClick={() => handleViewRoadmap(roadmap)}
            className="card roadmap-card">
            <img
              className="card-img-top"
              src={`assets/roadmaps_images/roadmap_${imageIndex}.jpg`}
              alt="Card image cap"
            />
            <div className="card-body">
              <p className="card-text">{roadmap.title}</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

export default RoadmapsContainer
