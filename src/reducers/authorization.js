import { AUTHORIZED } from '../actions';

const initialState =  {
  authorized: false
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case AUTHORIZED:
      const newState = Object.assign({}, state);
      newState.authorized = true;

      return newState;

    /* Default reducer: return the state with no changes */
    default:
      return state;
  }
}