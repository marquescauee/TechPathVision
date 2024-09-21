import Input from '../../components/map-profile/input/Input'
import MapButton from '../../components/map-profile/map-button/MapButton'
import SelectedAttributes from '../../components/map-profile/selected-attributes/SelectedAttributes'
import SuggestedAttributes from '../../components/map-profile/suggested-attributes/SuggestedAttributes'
import { AttributesProvider } from '../../contexts/useAttributesContext'

const MapProfilePage = () => {
  return (
    <>
      <Input />
      <AttributesProvider>
        <SelectedAttributes />
        <SuggestedAttributes />
      </AttributesProvider>
      <MapButton />
    </>
  )
}

export default MapProfilePage
