import { useState } from 'react'
import './Login.css'
import { useAuth } from '../../contexts/useAuth'
import { isInvalidEmail } from '../../utils/isInvalidEmail'
import { validatePasswordLength } from '../../utils/validatePasswordLength'

interface LoginUser {
  email: string
  password: string
}

interface LoginUserErrors {
  emailError: boolean
  passwordError: boolean
}

const ERRORS = {
  emailError: false,
  passwordError: false
}

const Login = () => {
  const { login } = useAuth()

  const [userData, setUserData] = useState<LoginUser>({
    email: '',
    password: ''
  })

  const [formErrors, setFormErrors] = useState<LoginUserErrors>({
    emailError: false,
    passwordError: false
  })

  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setFormErrors({
      emailError: false,
      passwordError: false
    })
    setErrorMessage('')

    ERRORS.emailError = isInvalidEmail(userData.email)
    ERRORS.passwordError = validatePasswordLength(userData.password)

    setFormErrors(ERRORS)

    const hasErrors = Object.values(ERRORS).some((error) => error)

    if (hasErrors) return

    const response = await login(userData)

    if (response.error) {
      setErrorMessage('Usuário e/ou senha inválidos.')
    }
  }

  return (
    <form action="post" className="form-width" onSubmit={handleLogin}>
      <div className="login-wrapper">
        <div className="login-title">LOGIN</div>
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
              placeholder="Digite seu e-mail"
              required
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            {formErrors.emailError && <span className="error">Email inválido.</span>}
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
              placeholder="Digite sua senha"
              required
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            {formErrors.passwordError && (
              <span className="error">A senha deve ter entre 8 e 16 caracteres.</span>
            )}
            {errorMessage && <span className="error">Usuário e/ou senha inválidos.</span>}
            <a href="/forgot-password" className="forgot-password">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <button type="submit" className="login-button login">
          ENTRAR
        </button>
      </div>
    </form>
  )
}

export default Login
