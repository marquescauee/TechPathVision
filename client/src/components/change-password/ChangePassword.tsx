import './ChangePassword.css'

const ChangePassword = () => {
  return (
    <form action="post" className="form-width">
      <div className="forgot-password-page">
        <div className="login-wrapper">
          <div className="login-title">DEFINIR NOVA SENHA</div>
          <div className="fields-wrapper">
            <div className="label-input-wrapper">
              <label className="label" htmlFor="new-password">
                Nova senha:
              </label>
              <input
                className="input"
                type="password"
                id="new-password"
                name="new-password"
                placeholder="Digite sua senha"
              />
            </div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="confirm-new-password">
                Confirmar nova senha:
              </label>
              <input
                className="input"
                type="password"
                id="confirm-new-password"
                name="confirm-new-password"
                placeholder="Confirme sua senha"
              />
            </div>
          </div>
          <button className="login-button login">enviar</button>
        </div>
      </div>
    </form>
  )
}

export default ChangePassword
