import './MyProfileForm.css'

const MyProfileForm = () => {
  return (
    <div className="my-profile-page">
      <form className="form-width">
        <div className="login-wrapper">
          <div className="fields-wrapper">
            <div className="label-input-wrapper">
              <label className="label" htmlFor="name">
                Nome:
              </label>
              <input className="input" type="text" id="name" name="name" />
            </div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="email">
                Email:
              </label>
              <input disabled className="input" type="email" id="email" name="email" />
            </div>
            <div className="dropdown-divider"></div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="current-password">
                Senha atual:
              </label>
              <input
                disabled
                className="input"
                type="password"
                id="current-password"
                name="current-password"
              />
            </div>
            <div className="label-input-wrapper">
              <label className="label" htmlFor="new-password">
                Nova senha:
              </label>
              <input
                disabled
                className="input"
                type="password"
                id="new-password"
                name="new-password"
              />
            </div>
          </div>
          <button className="login-button login">enviar</button>
        </div>
      </form>
    </div>
  )
}

export default MyProfileForm
