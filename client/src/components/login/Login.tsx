import './Login.css'

const Login = () => {
  return (
    <form action="post" className="form-width">
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
            />
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
            />
            <a href="#" className="forgot-password">
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <button className="login-button login">ENTRAR</button>
      </div>
    </form>
  )
}

export default Login
