import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { useHistory } from "react-router-dom";
import { logOutUser } from '../../actions/authActions'
import store from '../../store';

const Logout = (props) => {


  const [checked, setChecked] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (checked) {
      console.log("Déconnexion");
      if (localStorage.getItem("user")) {
        localStorage.removeItem("name");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        store.dispatch(logOutUser());
        history.push("/");
      }
    }
  }, [checked, history, props]);

  const handleChange = event => {
    setChecked(event.target.checked);
  }

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input
          onChange={handleChange}
          type="checkbox"
          checked={checked}
        />
        <span className="slider round" data-tip="Deconnexion"></span>
      </label>
      <ReactTooltip place="left" effet="solid" />
    </div>
  )
}

export default Logout
