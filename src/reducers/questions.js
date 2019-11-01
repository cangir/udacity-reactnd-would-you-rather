import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER
} from "../actions/actionTypes";

function questions(state = {}, action) {
  const { type, question, id, answer, authedUser } = action;
  switch (type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ADD_QUESTION:
      return {
        ...state,
        [question.id]: question
      };
    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: state[id][answer].votes.concat(authedUser)
          }
        }
      };
    default:
      return state;
  }
}

export default questions;
