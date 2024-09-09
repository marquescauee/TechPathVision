import './Register.css'

const Register = () => {
  return (
    <form action="post" className="form-width">
      <div className="register-wrapper">
        <div className="register-title">CADASTRE-SE</div>
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
              placeholder="Digite seu nome"
            />
          </div>
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
          </div>
        </div>
        <button className="login-button register">CADASTRAR</button>
      </div>
    </form>
  )
}

export default Register
