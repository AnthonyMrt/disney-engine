import React, { useState } from 'react'
import Service from "../../services/Service";
import { Link } from 'react-router-dom';
import { LoadUser } from '../../actions/authActions'
import store from '../../store';


const Login = (props) => {

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [verified, setVerified] = useState(true);
  const [test, setTest] = useState(null)


  const connectUser = e => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };
    setTest(true)
    Service.logIn(JSON.stringify(data))
      .then(response => {
        if (response.data.verified) {
          localStorage.setItem("name", JSON.stringify(response.data.name));
          localStorage.setItem("user", JSON.stringify(response.data.token));
          localStorage.setItem("token", JSON.stringify(response.data.user._id));
          setVerified(true)
          store.dispatch(LoadUser());
        props.history.push({
          pathname: '/home',
          state: { pseudo: response.data.name }
        })
      } else {
          setEmail("");
          setPassword("");
          setVerified(false)
          setAlert(`Votre compte n'est pas vérifier! Veuillez consulter vos mails, afin compléter la procédure d'inscription.`)
          store.dispatch(LoadUser());
      }
      })
      .catch(error => {
        setEmail("");
        setPassword("");
        setAlert(`Identifiants inconnus, veuillez créer un compte pour vous connecter!`)
        setTest(false);
        setError(error);
        console.log(error);
      })
  }


  const btn = email === '' || password === ''
    ? <button disabled>Connexion</button> : <button>Connexion</button>

  const linkNewEmail = !verified
    ? <Link style={{ color: 'white' }} to="/resendToken">Cliquez-ici afin de recevoir un nouveau mail de vérification.</Link> : <Link style={{ color: 'white' }} to="/register">Nouveau sur disney-engine ? Inscrivez vous maintenant!</Link>


  // gestion erreurs



  return (

    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin">
        </div>
          <div className="formContent">
            <form onSubmit={connectUser}>

              {
                alert && <span
                  style={{
                    border: "1px solid red",
                    background: "red",
                    color: '#ffffff'
                  }}
                >
                  {alert}
                  <br></br>
                  {linkNewEmail}
                </span>
              }

              {error && <span>{error.message}</span>}

              <h2>Connexion</h2>

              <div className="inputBox">
                <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>

              {btn}

            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/register">Nouveau sur disney-engine ? Inscrivez vous maintenant!</Link>
              <br />
              <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié? Cliquez-ici!</Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login
