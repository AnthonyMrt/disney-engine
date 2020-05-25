import {
  ANSWER_SUBMIT,
  ANSWER_FALSE,
  ANSWER_GOOD
} from "../actions/types.js";


const initialState = {
  answerId: null,
  isSubmit: false,
  userAnswer: null,
  answerStatus: 'pending'
}
const answerReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ANSWER_SUBMIT:
      return {
        ...state,
        answerId: payload.answerId,
        isSubmit: true,
        userAnswer: payload.userAnswer
      };
    case ANSWER_FALSE:
      return {
        ...state,
        answerId: payload.answerId,
        isSubmit: true,
        userAnswer: payload.userAnswer,
        questionAnswer: payload.questionAnswer,
        answerStatus: false
      };
    case ANSWER_GOOD:
      return {
        ...state,
        answerId: payload.answerId,
        isSubmit: true,
        userAnswer: payload.userAnswer,
        questionAnswer: payload.questionAnswer,
        answerStatus: true
      }
    default:
      return state;
  }
}

export default answerReducer
