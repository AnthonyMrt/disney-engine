import {
  DATA_LOADED,
  NO_DATA,
} from './types'


export const dataLoaded = () => dispatch => {
  dispatch({
    type: DATA_LOADED,
    payload: {
      data_loaded: true
    }
  })
}

export const noData = () => dispatch => {
  dispatch({
    type: NO_DATA,
    payload: {
      data_loaded: false
    }
  })
}
