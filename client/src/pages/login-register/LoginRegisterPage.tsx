import Login from '../../components/login/Login'
import Register from '../../components/register/Register'
import { AuthProvider } from '../../contexts/useAuth'
import './LoginRegisterPage.css'

const LoginRegisterPage = () => {
  return (
    <div className="login-register-page">
      <AuthProvider>
        <Login />
        <Register />
      </AuthProvider>
    </div>
  )
}

export default LoginRegisterPage
