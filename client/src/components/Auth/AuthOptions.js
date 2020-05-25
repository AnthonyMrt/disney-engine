import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const AuthOptions = () => {

  return (
    <Fragment>
      <div className="leftBox">
        <Link className="btn-welcome" to="/register">Inscription</Link>
      </div>
      <div className="rightBox">
        <Link className="btn-welcome" to="/login">Connexion</Link>
      </div>
    </Fragment>
  );
}

export default AuthOptions
