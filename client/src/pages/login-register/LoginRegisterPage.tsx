import { useEffect, useState } from 'react'
import Login from '../../components/login/Login'
import Register from '../../components/register/Register'
import { AuthProvider } from '../../contexts/useAuth'
import './LoginRegisterPage.css'

const LoginRegisterPage = () => {
  const [hasRoadmapToSave, setHasRoadmapToSave] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('roadmapToBeSaved')) {
      setHasRoadmapToSave(true)
    }
  }, [])

  return (
    <>
      <div className="login-register-page">
        <AuthProvider>
          <Login />
          <Register />
        </AuthProvider>
      </div>
      {hasRoadmapToSave && (
        <div className="toast login-to-save-roadmap">
          Por favor, realize o login para salvar seu roadmap!
        </div>
      )}
    </>
  )
}

export default LoginRegisterPage
