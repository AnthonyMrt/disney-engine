import {
  QUIZ_SUCCEED,
  QUIZ_FAILED,
  MODAL_OPEN,
  MODAL_CLOSE
} from './types'


export const quizSucceed = (quizLevel, score, percentage) => dispatch => {
  dispatch({
    type: QUIZ_SUCCEED,
    payload: {
      quizStatus: "SUCCEED",
      quizLevel: quizLevel,
      quizScore: score,
      quizPercentage: percentage
    }
  })
}

export const quizFailed = (quizLevel, score, percentage) => dispatch => {
  dispatch({
    type: QUIZ_FAILED,
    payload: {
      quizStatus: "FAILED",
      quizLevel: quizLevel,
      quizScore: score,
      quizPercentage: percentage
    }
  })
}

export const modalOpen = (heroId) => dispatch => {
  dispatch({
    type: MODAL_OPEN,
    payload: {
      modalStatus: 'Open',
      heroId: heroId,
    }
  })
}

export const modalClose = () => dispatch => {
  dispatch({
    type: MODAL_CLOSE,
    payload: {
      modalStatus: 'Close'
    }
  })
}
