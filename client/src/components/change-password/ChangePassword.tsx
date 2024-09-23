import { useState } from 'react'
import { useAuth } from '../../contexts/useAuth'
import './ChangePassword.css'
import Spinner from '../spinner/Spinner'

interface ChangePasswordProps {
  newPassword: string
  confirmNewPassword: string
}

interface ChangePasswordErrors {
  newPasswordError: boolean
  confirmNewPasswordError: boolean
  passwordsDontMatch: boolean
}

const ChangePassword = () => {
  const { changePassword, login } = useAuth()

  const [passwordData, setPasswordData] = useState<ChangePasswordProps>({
    newPassword: '',
    confirmNewPassword: ''
  })

  const [formErrors, setFormErrors] = useState<ChangePasswordErrors>({
    newPasswordError: false,
    confirmNewPasswordError: false,
    passwordsDontMatch: false
  })

  const [loading, setLoading] = useState<boolean>(false)

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)

    setFormErrors({
      newPasswordError: false,
      confirmNewPasswordError: false,
      passwordsDontMatch: false
    })

    const errors = {
      newPasswordError: false,
      confirmNewPasswordError: false,
      passwordsDontMatch: false
    }

    if (
      !passwordData.newPassword.trim() ||
      passwordData.newPassword.length < 8 ||
      passwordData.newPassword.length > 16
    ) {
      errors.newPasswordError = true
    }

    if (
      !passwordData.confirmNewPassword.trim() ||
      passwordData.confirmNewPassword.length < 8 ||
      passwordData.confirmNewPassword.length > 16
    ) {
      errors.confirmNewPasswordError = true
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      errors.passwordsDontMatch = true
    }

    setFormErrors(errors)

    const hasErrors = Object.values(formErrors).some((error) => error)

    if (hasErrors) {
      setLoading(false)
      return
    }

    const token = window.location.pathname.split('/')[2]

    const response = await changePassword(passwordData.newPassword, token)

    if (Object.keys(response).includes('token')) {
      setErrorMessage('Token expirado. Por favor, solicite a redefinição de senha novamente.')
    }

    setLoading(false)

    if (response.data) {
      await login({ email: response.data.user.email, password: passwordData.newPassword })
    }
  }

  return (
    <form action="post" className="form-width" onSubmit={handleChangePassword}>
      <div className="forgot-password-page">
        <div className="login-wrapper">
          <div className="login-title">DEFINIR NOVA SENHA</div>
          <div className="fields-wrapper">
            <div className="label-input-wrapper">
              <label className="label" htmlFor="new-password">
                Nova senha:
              </label>
              <input
                className="input"
                type="password"
                id="new-password"
                name="new-password"
                required
                placeholder="Digite sua senha"
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              {formErrors.newPasswordError && !errorMessage && (
                <span className="error">A senha deve ter entre 8 e 16 caracteres.</span>
              )}
            </div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="confirm-new-password">
                Confirmar nova senha:
              </label>
              <input
                className="input"
                type="password"
                id="confirm-new-password"
                name="confirm-new-password"
                required
                placeholder="Confirme sua senha"
                onChange={(e) =>
                  setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })
                }
              />
              {formErrors.confirmNewPasswordError && !errorMessage && (
                <span className="error">A senha deve ter entre 8 e 16 caracteres.</span>
              )}
              {formErrors.passwordsDontMatch && !errorMessage && (
                <span className="error">As senhas não são iguais.</span>
              )}
              {errorMessage && <span className="error">{errorMessage}</span>}
            </div>
          </div>
          {loading ? <Spinner /> : <button className="login-button login">enviar</button>}
        </div>
      </div>
    </form>
  )
}

export default ChangePassword
