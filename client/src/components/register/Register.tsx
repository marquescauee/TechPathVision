import { useState } from 'react'
import './Register.css'
import { useAuth } from '../../contexts/useAuth'
import { validateNameLength } from '../../utils/validateNameLength'
import { isInvalidEmail } from '../../utils/isInvalidEmail'
import { validatePasswordLength } from '../../utils/validatePasswordLength'

interface RegisterUser {
  first_name: string
  email: string
  password: string
}

interface RegisterUserErrors {
  nameError: boolean
  emailError: boolean
  passwordError: boolean
}

const ERRORS = {
  nameError: false,
  emailError: false,
  passwordError: false
}

const Register = () => {
  const { register } = useAuth()

  const [userData, setUserData] = useState<RegisterUser>({
    first_name: '',
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState<RegisterUserErrors>({
    nameError: false,
    emailError: false,
    passwordError: false
  })

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFormErrors({
      nameError: false,
      emailError: false,
      passwordError: false
    })

    setErrorMessage('')

    const initialErrors = { ...ERRORS }
    initialErrors.nameError = validateNameLength(userData.first_name)
    initialErrors.emailError = isInvalidEmail(userData.email)
    initialErrors.passwordError = validatePasswordLength(userData.password)

    setFormErrors(initialErrors)

    const hasErrors = Object.values(initialErrors).some((error) => error)

    if (hasErrors) return

    const response = await register(userData)
    console.log(response)

    if (response.error) {
      setErrorMessage(Object.values(response.error)[0])
    }
  }

  return (
    <form action="post" className="form-width" onSubmit={handleRegister}>
      <div className="register-wrapper">
        <div className="register-title">CADASTRE-SE</div>
        <div className="fields-wrapper">
          <div className="label-input-wrapper">
            <label className="label" htmlFor="first_name">
              Nome:
            </label>
            <input
              className="input"
              type="text"
              id="first_name"
              name="first_name"
              required
              placeholder="Digite seu nome"
              onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
            />
            {formErrors.nameError && <span className="error">Nome inválido.</span>}
          </div>
          <div className="label-input-wrapper">
            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              className="input"
              type="email"
              id="email"
              required
              name="email"
              placeholder="Digite seu e-mail"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            {formErrors.emailError && <span className="error">Email inválido.</span>}
            {errorMessage && <span className="error">{errorMessage}</span>}
          </div>
          <div className="label-input-wrapper">
            <label className="label" htmlFor="password">
              Senha:
            </label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              required
              placeholder="Digite sua senha"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            {formErrors.passwordError && (
              <span className="error">A senha deve ter entre 8 e 16 caracteres.</span>
            )}
          </div>
        </div>
        <button type="submit" className="login-button register">
          CADASTRAR
        </button>
      </div>
    </form>
  )
}

export default Register
