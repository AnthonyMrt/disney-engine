import React, { useState } from 'react'
import Service from "../../services/Service";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";



const Register = (props) => {

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();


  const saveUser = e => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password
    };
    Service.signUp(JSON.stringify(data))
      .then(
        setSubmitted(true),
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: {
            name: name,
            email: email
          }
        }),
        props.history.push('/login')
      )
      .catch(error => {
        setError(error);
        console.log(error);
        dispatch({
          type: "REGISTER_FAILED"
        });
      })
  }


  const btn = name === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled>Inscription</button> : <button>Inscription</button>

  // gestion erreurs

  const errorMsg = error !== '' && <span>{error.message}</span>
  const succeedMsg = submitted !== false && <span>{'inscription réussie!'}</span>

  const Msg = submitted !== false ?
    (
      succeedMsg
    )
    :
    (
      errorMsg
    )


  return (

    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup">
        </div>
          <div className="formContent">
            <form onSubmit={saveUser}>

              {Msg}

              <h2>Inscription</h2>
              <div className="inputBox">
                <input type="text" id="name" onChange={e => setName(e.target.value)} value={name} autoComplete="off" />
                <label htmlFor="name">Name</label>
              </div>

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
              <Link className="simpleLink" to="/login">Déjà inscrit? Connectez-vous </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// })

// export default connect(
//   mapStateToProps,
//   {register}
// )(Register);

export default Register
