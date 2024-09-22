import MapAttributesInput from '../../components/map-profile/input/Input'
import MapButton from '../../components/map-profile/map-button/MapButton'
import SelectedAttributes from '../../components/map-profile/selected-attributes/SelectedAttributes'
import SuggestedAttributes from '../../components/map-profile/suggested-attributes/SuggestedAttributes'
import { AttributesProvider } from '../../contexts/useAttributesContext'

const MapProfilePage = () => {
  return (
    <>
      <AttributesProvider>
        <MapAttributesInput />
        <SelectedAttributes />
        <SuggestedAttributes />
        <MapButton />
      </AttributesProvider>
    </>
  )
}

export default MapProfilePage
