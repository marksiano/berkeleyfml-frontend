import { LOAD_POST } from '../actions';

const initialState =  {
  id: null,
  text: null,
  upvotes: null,
  downvotes: null,
  dateObject: null,
  dateString: null,
  comments: []
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case LOAD_POST:
      const newState = Object.assign({}, state);
      newState.text = action.text;
      newState.upvotes = action.upvotes;
      newState.downvotes = action.downvotes;
      newState.dateObject = action.dateObject;
      newState.dateString = action.dateString;
      newState.comments = action.comments.slice();

      return newState;

    /* Default reducer: return the state with no changes */
    default:
      return state;
  }
}