import Input from '../../components/map-profile/input/Input'
import MapButton from '../../components/map-profile/map-button/MapButton'
import SelectedAttributes from '../../components/map-profile/selected-attributes/SelectedAttributes'
import SuggestedAttributes from '../../components/map-profile/suggested-attributes/SuggestedAttributes'

const MapProfilePage = () => {
  return (
    <>
      <Input />
      <SelectedAttributes />
      <SuggestedAttributes />
      <MapButton />
    </>
  )
}

export default MapProfilePage
