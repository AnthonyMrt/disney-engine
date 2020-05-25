import {
  ANSWER_SUBMIT,
  ANSWER_GOOD,
  ANSWER_FALSE
} from './types'


export const answerSubmit = (data) => dispatch => {
  dispatch({
    type: ANSWER_SUBMIT,
    payload: {
      answerId: data.answerId,
      answerSubmit: true,
      userAnswer: data.userAnswer
    }
  })
}

export const answerGood = (id, userAnswer, questionAnswer) => dispatch => {
  dispatch({
    type: ANSWER_GOOD,
    payload: {
      answerId: id,
      answerSubmit: true,
      userAnswer: userAnswer,
      questionAnswer: questionAnswer,
      answerStatus: true
    }
  })
}

export const answerFalse = (id, userAnswer, questionAnswer) => dispatch => {
  dispatch({
    type: ANSWER_FALSE,
    payload: {
      answerId: id,
      answerSubmit: true,
      userAnswer: userAnswer,
      questionAnswer: questionAnswer,
      answerStatus: false
    }
  })
}


