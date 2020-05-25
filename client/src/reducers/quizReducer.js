import {
  QUIZ_SUCCEED,
  QUIZ_FAILED,
  MODAL_OPEN,
  MODAL_CLOSE
} from '../actions/types';


const initialState = {
  quizStatus: null,
  quizLevel: null,
  quizScore: null,
  quizPercentage: null,
}

const quizReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case QUIZ_SUCCEED:
      return {
        ...state,
        quizStatus: 'succeed',
        quizLevel: payload,
        quizScore: payload,
        quizPercentage: payload
      };
    case QUIZ_FAILED:
      return {
        ...state,
        quizStatus: 'failed',
        quizLevel: payload,
        quizScore: payload,
        quizPercentage: payload
      }
    case MODAL_OPEN:
      return {
        ...state,
        modalStatus: 'Open',
        heroId: payload,
        heroName: payload,
      }
    case MODAL_CLOSE:
      return {
        ...state,
        modalStatus: 'Close',
      }
    default:
      return state;
  }
}

export default quizReducer
