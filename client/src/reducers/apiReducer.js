import {
  DATA_LOADED,
  NO_DATA
} from "../actions/types.js";


const initialState = {
    data_loaded: null
}

const apiReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case DATA_LOADED:
      return {
        ...state,
        data_loaded: true
      };
    case NO_DATA:
      return {
        ...state,
        data_loaded: false
      }
    default:
      return state
  }
}

export default apiReducer
