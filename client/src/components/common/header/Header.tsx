import { useEffect, useState } from 'react'
import LoginButton from '../login-button/LoginButton'
import Logo from '../logo/Logo'
import './Header.css'
import { useAuth } from '../../../contexts/useAuth'

const Header = () => {
  const { logout, getCredentials } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const { token, user } = getCredentials()
    if (token && user) {
      setIsLoggedIn(true)
      setUserName(user.first_name.split(' ')[0])
    } else {
      setIsLoggedIn(false)
      setUserName('')
    }
  }, [getCredentials])

  return (
    <header className="header">
      <Logo />
      {!isLoggedIn ? (
        <a href="/login" className="login-redirect-wrapper">
          <LoginButton />
        </a>
      ) : (
        <>
          <a
            className="nav-link dropdown-toggle logged-dropdown"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Olá, {userName}!
          </a>
          <div className="dropdown-menu logged-dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item logged-dropdown-item" href="/my-profile">
              Meu Perfil
            </a>
            <a className="dropdown-item logged-dropdown-item" href="#">
              Meus Roadmaps
            </a>
            <div className="dropdown-divider logged-dropdown-divider"></div>
            <a onClick={() => logout()} className="dropdown-item logged-dropdown-item" href="#">
              Sair
            </a>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
