import {
  SEARCH_LOADING,
  SEARCH_SUCCESS,
  SEARCH_FAILED,
  UNIVERS_SELECT,
  CHARACTER_CLICK,
} from "../actions/types.js";


const initialState = {
  id: null,
  characterName: null,
  characterUnivers: null,
  isResearched: false,
  isFind: false,
}

const searchReducer = (state = initialState, action) => {
  const {type, payload} = action

  switch(type) {
    case SEARCH_LOADING:
      return {
        ...state,
        characterName: payload.name,
        isResearched: true
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        id: payload.id,
        characterName: payload.name,
        characterUnivers: payload.univers,
        isResearched: false,
        isFind: true
      }
    case SEARCH_FAILED:
      return {
        ...state,
        characterName: payload.name,
        characterUnivers: payload.univers,
        isResearched: false,
        isFind: false
      }
    case UNIVERS_SELECT:
      return {
        ...state,
        characterUnivers: payload.univers
      }
    case CHARACTER_CLICK:
      return {
        ...state,
        id: payload.id,
        characterName: payload.name,
        characterUnivers: payload.univers,
        isFind: true
      }
    default:
      return state;
  }
}

export default searchReducer
