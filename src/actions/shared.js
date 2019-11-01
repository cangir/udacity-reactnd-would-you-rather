import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from "../utils/_DATA";
import {
  receiveUsers,
  addQuestionToAuthedUser,
  saveQuestionAnswerToAuthedUser
} from "./users";
import { receiveQuestions, addQuestion, saveQuestionAnswer } from "./questions";
import { setAuthedUser } from "./authedUser";

let AUTHED_ID = localStorage.getItem("loggedInUser");
if (AUTHED_ID === "null") {
  AUTHED_ID = null;
}

export function handleInitialData() {
  return dispatch => {
    return Promise.all([_getUsers(), _getQuestions()]).then(values => {
      dispatch(receiveUsers(values[0]));
      dispatch(receiveQuestions(values[1]));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    }).then(question => {
      dispatch(addQuestion(question));
      dispatch(addQuestionToAuthedUser(authedUser, question.id));
    });
  };
}

export function handleSaveQuestionAnswer(id, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid: id,
      answer
    })
      .then(dispatch(saveQuestionAnswer(id, answer, authedUser)))
      .then(dispatch(saveQuestionAnswerToAuthedUser(authedUser, id, answer)));
  };
}
