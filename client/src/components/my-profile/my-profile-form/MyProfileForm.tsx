import { useState } from 'react'
import { useAuth } from '../../../contexts/useAuth'
import './MyProfileForm.css'
import Spinner from '../../spinner/Spinner'
import { validateNameLength } from '../../../utils/validateNameLength'
import { validatePasswordLength } from '../../../utils/validatePasswordLength'

interface ChangeDataErrors {
  nameError: boolean
  newPasswordError: boolean
  confirmPasswordError: boolean
  confirmPasswordNotFilled: boolean
  passwordNotFilled: boolean
  currentPasswordWrong: boolean
}

interface UpdateUserData {
  first_name: string
  email: string
  password: string
}

const ERRORS = {
  nameError: false,
  newPasswordError: false,
  confirmPasswordError: false,
  confirmPasswordNotFilled: false,
  passwordNotFilled: false,
  currentPasswordWrong: false
}

const MyProfileForm = () => {
  const { getCredentials, updateUser } = useAuth()

  const [userData, setUserData] = useState<UpdateUserData>({
    first_name: getCredentials().user.first_name,
    email: getCredentials().user.email,
    password: ''
  })

  const [formErrors, setFormErrors] = useState<ChangeDataErrors>({
    nameError: false,
    newPasswordError: false,
    confirmPasswordError: false,
    confirmPasswordNotFilled: false,
    passwordNotFilled: false,
    currentPasswordWrong: false
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [newPassword, setNewPassword] = useState<string>('')

  const handleChangeData = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)

    setFormErrors({
      nameError: false,
      newPasswordError: false,
      confirmPasswordError: false,
      confirmPasswordNotFilled: false,
      passwordNotFilled: false,
      currentPasswordWrong: false
    })

    ERRORS.nameError = !validateNameLength(userData.first_name)

    if (userData.password && !newPassword) {
      ERRORS.confirmPasswordNotFilled = true
    }

    if (!userData.password && newPassword) {
      ERRORS.passwordNotFilled = true
    }

    if (userData.password) {
      ERRORS.newPasswordError = validatePasswordLength(userData.password)
      ERRORS.confirmPasswordError = validatePasswordLength(newPassword)
    }

    setFormErrors(ERRORS)

    const hasErrors = Object.values(formErrors).some((error) => error)

    if (hasErrors) {
      setLoading(false)
      return
    }

    const response = await updateUser({
      first_name: userData.first_name,
      current_password: userData.password,
      new_password: newPassword
    })

    if (typeof response === 'object' && response !== null && 'error' in response) {
      if (response.error === 'Current password is wrong') {
        setFormErrors({ ...ERRORS, currentPasswordWrong: true })
        setLoading(false)
        return
      }
    }

    setUserData({ ...userData, password: '' })
    setNewPassword('')
    setLoading(false)
  }

  return (
    <div className="my-profile-page">
      <form className="form-width" action="PATCH" onSubmit={handleChangeData}>
        <div className="login-wrapper">
          <div className="fields-wrapper">
            <div className="label-input-wrapper">
              <label className="label" htmlFor="name">
                Nome:
              </label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                value={userData.first_name}
                onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
              />
              {formErrors.nameError && <span className="error">Nome inválido.</span>}
            </div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input
                disabled
                className="input input-email-my-profile"
                type="email"
                id="email"
                name="email"
                value={getCredentials().user.email}
              />
            </div>
            <div className="dropdown-divider"></div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="current-password">
                Senha atual:
              </label>
              <input
                className="input"
                type="password"
                id="current-password"
                name="current-password"
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              {formErrors.newPasswordError && (
                <span className="error">A senha deve ter entre 8 e 16 caracteres.</span>
              )}
              {formErrors.passwordNotFilled && (
                <span className="error">Para atualizar a senha, preencha este campo.</span>
              )}
              {formErrors.currentPasswordWrong && (
                <span className="error">A senha atual é inválida.</span>
              )}
            </div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="new-password">
                Nova senha:
              </label>
              <input
                className="input"
                type="password"
                id="new-password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {formErrors.confirmPasswordNotFilled && (
                <span className="error">Para atualizar a senha, preencha este campo.</span>
              )}
              {formErrors.confirmPasswordError && !formErrors.confirmPasswordNotFilled && (
                <span className="error">A senha deve ter entre 8 e 16 caracteres.</span>
              )}
            </div>
          </div>
          {loading ? <Spinner /> : <button className="login-button login">enviar</button>}
        </div>
      </form>
    </div>
  )
}

export default MyProfileForm
