import './ForgotPassword.css'

const ForgotPassword = () => {
  return (
    <form action="post" className="form-width">
      <div className="forgot-password-page">
        <div className="login-wrapper">
          <div className="login-title">RECUPERAR SENHA</div>
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
          </div>
          <button className="login-button login">enviar</button>
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword
