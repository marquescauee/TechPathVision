import { useState } from 'react'
import MapAttributesInput from '../../components/map-profile/input/Input'
import MapButton from '../../components/map-profile/map-button/MapButton'
import SelectedAttributes from '../../components/map-profile/selected-attributes/SelectedAttributes'
import SuggestedAttributes from '../../components/map-profile/suggested-attributes/SuggestedAttributes'
import { AttributesProvider } from '../../contexts/useAttributesContext'
import LoadingPage from '../../components/loading-page/LoadingPage'

const MapProfilePage = () => {
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <LoadingPage component={'map-profile'} />

  return (
    <>
      <AttributesProvider>
        <MapAttributesInput />
        <SelectedAttributes />
        <SuggestedAttributes />
        <MapButton setLoading={setLoading} />
      </AttributesProvider>
    </>
  )
}

export default MapProfilePage
