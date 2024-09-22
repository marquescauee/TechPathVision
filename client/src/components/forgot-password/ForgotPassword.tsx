import { useState } from 'react'
import './ForgotPassword.css'
import { useAuth } from '../../contexts/useAuth'

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const { requestResetPassword } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setErrorMessage('')

    const response = await requestResetPassword(email)

    console.log(response)

    if (response.error) {
      setErrorMessage(`${response.error}.`)
    }
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
              {errorMessage && <span className="error">{errorMessage}</span>}
            </div>
          </div>
          <button className="login-button login">enviar</button>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword
