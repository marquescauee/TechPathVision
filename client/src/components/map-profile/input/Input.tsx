import { useEffect, useState } from 'react'
import './Input.css'

const Input = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1024)
  }, [])

  return (
    <div className="input-wrapper">
      <input
        className="input"
        type="text"
        placeholder={`Escreva aqui alguns atributos sobre você ${!isMobile ? 'ou interesses' : ''}`}
      />
      <div className="input-description">
        Quanto mais atributos, melhor para mapear carreiras compatíveis com você.
      </div>
    </div>
  )
}

export default Input
