import { useState } from 'react'
import './ForgotPassword.css'
import { useAuth } from '../../contexts/useAuth'
import Spinner from '../spinner/Spinner'

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const { requestResetPassword } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    setSuccessMessage('')
    setErrorMessage('')
    e.preventDefault()
    e.stopPropagation()

    const response = await requestResetPassword(email)

    if (response.error) {
      setErrorMessage(response.error)
      setLoading(false)
      return
    }

    setSuccessMessage('E-mail enviado com sucesso! Verifique sua caixa de entrada.')
    setLoading(false)
  }

  return (
    <form action="post" className="form-width" onSubmit={handleSubmit}>
      <div className="forgot-password-page">
        <div className="login-wrapper">
          <div className="login-title">RECUPERAR SENHA</div>
          <div className="fields-wrapper">
            <div className="label-input-wrapper">
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Digite seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="send-mail-info">
              {errorMessage && <span className="error send-mail-error">{errorMessage}</span>}
              {successMessage && <div className="success-message">{successMessage}</div>}
            </div>
          </div>
          {loading ? <Spinner /> : <button className="login-button login">enviar</button>}
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword
