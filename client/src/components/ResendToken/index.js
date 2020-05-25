import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Service from "../../services/Service";


const ResendToken = props => {

  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      email: email,
    };
    Service.resendToken(JSON.stringify(data))
      .then(() => {
        setError(null);
        setSuccess(`Un email vous a été envoyez à l'adresse: ${email} afin de completer votre inscription!`);
        setEmail("");
        setTimeout(() => {
          props.history.push('/login');
        }, 5000)
      })
      .catch(error => {
        setError(error);
        setEmail("");
      })
  }

  const disabled = email === "";

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftToken">
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

            {error && <span>{error.message}</span>}


            <h2>Renvoyez mail de vérification de compte</h2>

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

export default ResendToken
