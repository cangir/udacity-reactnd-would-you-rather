import {
  RECEIVE_USERS,
  ADD_QUESTION_TO_AUTHED_USER,
  SAVE_QUESTION_ANSWER_TO_AUTHED_USER
} from "./actionTypes";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addQuestionToAuthedUser(authedUser, id) {
  return {
    type: ADD_QUESTION_TO_AUTHED_USER,
    authedUser,
    id
  };
}

export function saveQuestionAnswerToAuthedUser(authedUser, id, answer) {
  return {
    type: SAVE_QUESTION_ANSWER_TO_AUTHED_USER,
    authedUser,
    id,
    answer
  };
}
