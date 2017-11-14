import { AUTHOR_UPDATED, COMMENT_UPDATED } from '../actions';

const initialState =  {
  currentAuthorText: null,
  currentCommentText: null
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case COMMENT_UPDATED:
      state.currentCommentText = action.text;
      return state;

    case AUTHOR_UPDATED:
      state.currentAuthorText = action.text;
      return state;

    /* Default reducer: return the state with no changes */
    default:
      return state;
  }
}