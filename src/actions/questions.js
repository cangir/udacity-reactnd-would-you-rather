import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER
} from "./actionTypes";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function saveQuestionAnswer(id, answer, authedUser) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id,
    answer,
    authedUser
  };
}
