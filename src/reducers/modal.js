import { TOGGLE_MODAL, SUBMIT_FML } from '../actions';

const initialState =  {
  activated: false
};

export default function pages(state = initialState, action) {
  switch (action.type) {
  	case TOGGLE_MODAL:
  		const newState = Object.assign({}, state);
  		newState.activated = !newState.activated;

  		return newState;

    default:
      return state;
  }
}