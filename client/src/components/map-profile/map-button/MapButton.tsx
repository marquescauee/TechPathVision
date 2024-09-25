import { useState } from 'react'
import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { useCareersContext } from '../../../contexts/useCareersContext'
import './MapButton.css'
import { useNavigate } from 'react-router-dom'

const MapButton = () => {
  const { selectedAttributes } = useAttributesContext()
  const { sendProfile } = useCareersContext()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClick = async () => {
    setErrorMessage('')

    if (selectedAttributes.length >= 8) {
      const response = await sendProfile(selectedAttributes)

      if (response.error) {
        setErrorMessage('Falha ao enviar atributos.')
        return
      }

      navigate('/careers-found')
    }
  }

  return (
    <div className="map-button-wrapper">
      {errorMessage && <div>{errorMessage}</div>}
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
