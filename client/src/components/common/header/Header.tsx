import { useState } from 'react'
import LoginButton from '../login-button/LoginButton'
import Logo from '../logo/Logo'
import './Header.css'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <header className="header">
      <Logo />
      {!isLoggedIn ? (
        <div onClick={() => setIsLoggedIn(true)}>
          <LoginButton />
        </div>
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
            Olá, Cauê!
          </a>
          <div className="dropdown-menu logged-dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item logged-dropdown-item" href="#">
              Meu Perfil
            </a>
            <a className="dropdown-item logged-dropdown-item" href="#">
              Meus Roadmaps
            </a>
            <div className="dropdown-divider logged-dropdown-divider"></div>
            <a
              onClick={() => setIsLoggedIn(false)}
              className="dropdown-item logged-dropdown-item"
              href="#">
              Sair
            </a>
          </div>
        </>
      )}
    </header>
  )
}

export default Header
