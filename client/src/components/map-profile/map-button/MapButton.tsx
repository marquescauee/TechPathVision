import { useState } from 'react'
import { useAttributesContext } from '../../../contexts/useAttributesContext'
import { useCareersContext } from '../../../contexts/useCareersContext'
import './MapButton.css'
import { useNavigate } from 'react-router-dom'

interface MapButtonProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MapButton = ({ setLoading }: MapButtonProps) => {
  const { selectedAttributes } = useAttributesContext()
  const { mapProfile } = useCareersContext()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleClick = async () => {
    setErrorMessage('')
    setLoading(true)

    if (selectedAttributes.length >= 8) {
      const selectedAttributesValues = selectedAttributes.map((attribute) => attribute.value)

      const response = await mapProfile(selectedAttributesValues)

      if (response.error) {
        setErrorMessage('Falha ao enviar atributos.')
        return
      }

      setLoading(false)
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
