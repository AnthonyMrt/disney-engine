import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types.js";


const initialState = {
  isAuthenticated: null,
  isLoading: false,
  user: null,
  isRegistered: null,
}
const authReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
        isRegistered: true,
      };
    case LOGIN_SUCCESS:
      return{
        ...state,
        isAuthenticated: true,
        isLoading: true,
        isRegistered: true,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistered: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isRegistered: false
      };
    default:
     return state;
  }
}

export default authReducer
