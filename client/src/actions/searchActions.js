import {
  UNIVERS_SELECT,
  CHARACTER_CLICK,
  SEARCH_SUBMIT
} from './types'

export const universSelect = (univers) => dispatch => {
  dispatch({
    type: UNIVERS_SELECT,
    payload: {
      univers: univers
    }
  })
}

export const characterClick = (id, name, univers) => dispatch => {
  dispatch({
    type: CHARACTER_CLICK,
    payload: {
      id: id,
      name: name,
      univers: univers
    }
  })
}

export const characterSearch = (searchValue) => dispatch => {
  dispatch({
    type: SEARCH_SUBMIT,
    payload: {
      searchSubmit: searchValue
    }
  })
}
