import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Service from "../../services/Service";


const ForgetPassword = props => {

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: email,
    };
    Service.askNewPassword(JSON.stringify(data))
      .then(() => {
        setError(null);
        setSuccess(`Consultez votre email: ${email} pour changer de mot de passe`);
        setEmail("");
        setTimeout(() => {
          props.history.push('/login');
        }, 5000)
      })
      .catch(error => {
        setError(error);
        console.log(error);
        setErrorMsg("Aucun compte n'est associé à cet email! Veuillez-vous inscrire.");
        setEmail("");
      })
  }

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget">
        </div>

        <div className="formBoxRight">
          <div className="formContent">

            {
              success && <span
                style={{
                  border: "1px solid green",
                  background: "green",
                  color: '#ffffff'
                }}
              >
                {success}
              </span>
            }

            {error && <span>{errorMsg}</span>}


            <h2>Mot de passe oublié?</h2>

            <form onSubmit={handleSubmit}>

              <div className="inputBox">
                <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <button disabled={disabled}>Valider</button>

            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Vous connaissez votre mot de passe? Connectez-vous!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
