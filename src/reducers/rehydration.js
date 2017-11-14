import { REQUEST_POSTS, UPVOTE_POST, REHYDRATION_COMPLETE } from '../actions';

const initialState =  {
  completed: false
};

export default function rehydration(state = initialState, action) {
  switch (action.type) {
    case (REHYDRATION_COMPLETE):
      return {
        ...state, completed: true
      }
    default:
      return state;
  }
}