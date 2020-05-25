import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const RedefinePassword = (props) => {

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');



  const newPassword = e => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const token = props.match.params.token;
    const requestData = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(`http://localhost:9000/user/changePassword/${token}`, requestData)
      .then(() => {
        setError(null);
        setSuccess(`Mot de passe changez avec succès!`);
        setTimeout(() => {
          props.history.push('/login');
        }, 5000)
      })
      .catch(error => {
        setError(error);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        console.log(data.token);
      })
  }


  const btn = email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscription</button> : <button>Inscription</button>

  // gestion erreurs


  return (

    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="">
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


            <form onSubmit={newPassword}>

              <h2>Changez mot de passe</h2>

              <div className="inputBox">
                <input type="email" id="email" onChange={e => setEmail(e.target.value)} value={email} autoComplete="off" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input type="password" id="password" onChange={e => setPassword(e.target.value)} value={password} autoComplete="off" required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input type="password" id="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} autoComplete="off" required />
                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
              </div>

              {btn}

            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">Vous conaissez votre mot de passe? Connectez-vous!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedefinePassword
