import { useNavigate } from 'react-router-dom'
import './StartButton.css'

const StartButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/map-profile')
  }

  return (
    <div className="start-button-wrapper">
      <span className="start-button-horizontal-line"></span>
      <button onClick={handleClick} className="pulse-button">
        Comece sua jornada
      </button>
      <span className="start-button-horizontal-line"></span>
    </div>
  )
}

export default StartButton
