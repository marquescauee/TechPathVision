import { useState } from 'react'
import './Login.css'
import { useAuth } from '../../contexts/useAuth'

interface LoginUser {
  email: string
  password: string
}

interface LoginUserErrors {
  emailError: boolean
  passwordError: boolean
}

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/g

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

    const errors = {
      emailError: false,
      passwordError: false
    }

    if (!userData.email.trim() || !userData.email.match(EMAIL_REGEX)) {
      errors.emailError = true
    }

    if (
      !userData.password.trim() ||
      userData.password.length < 8 ||
      userData.password.length > 16
    ) {
      errors.passwordError = true
    }

    setFormErrors(errors)

    const hasErrors = Object.values(errors).some((error) => error)
    if (hasErrors) return

    const response = await login(userData)

    if (response.error) {
      if (Object.values(response.error)[0].toLowerCase().includes('invalid credentials')) {
        setErrorMessage('Usuário e/ou senha inválidos.')
      }
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
