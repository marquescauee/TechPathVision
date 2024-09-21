import { useAttributesContext } from '../../../contexts/useAttributesContext'
import './MapButton.css'

const MapButton = () => {
  const { selectedAttributes } = useAttributesContext()

  const handleClick = () => {
    if (selectedAttributes.length >= 8) {
      // Lógica para mapear
    }
  }

  return (
    <div className="map-button-wrapper">
      <button className="map-button" disabled={selectedAttributes.length < 8} onClick={handleClick}>
        Mapear
      </button>
      {selectedAttributes.length < 8 && (
        <div className="tooltip">
          Por favor, selecione pelo menos 8 atributos para realizar o mapeamento.
        </div>
      )}
    </div>
  )
}

export default MapButton
