import { useState } from 'react'
import CareersFound from '../../components/careers-found/CareersFound'
import LoadingPage from '../../components/loading-page/LoadingPage'

const CareerPage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <LoadingPage component={'generate-roadmap'} />

  return <CareersFound setLoading={setLoading} />
}

export default CareerPage
