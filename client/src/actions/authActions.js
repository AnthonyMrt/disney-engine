import axios from 'axios';
import { returnErrors } from './errorAction'

import {
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "./types";

//Check token & load user
export const LoadUser = () => (dispatch) => {
  //User Loading
  dispatch({ type: USER_LOADING });

  //Get token from localStorage
  const token = JSON.parse(localStorage.getItem('token'));
  //Headers
  const config = {
    headers: {
      "authToken": token
    }
  }


  axios.get('http://localhost:9000/user/user', config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: [AUTH_ERROR, LOGIN_FAIL]
      });
    })
}

export const logOutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: 'Utilisateur déconnecter'
  })
}

export const registerUser = (data) => (dispatch) => {
  dispatch({
    type: REGISTER_SUCCESS,
    payload: data
  })
}

