import { combineReducers } from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import answerReducer from './answerReducer';
import quizReducer from './quizReducer';
import searchReducer from './searchReducer';
import apiReducer from './apiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  search: searchReducer,
  answer: answerReducer,
  quiz: quizReducer,
  api: apiReducer
})

export default rootReducer;
