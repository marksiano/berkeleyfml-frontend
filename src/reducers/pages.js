import { REQUEST_POSTS, UPVOTE_POST, REHYDRATION_COMPLETE, DID_INITIAL_LOAD } from '../actions';

const initialState =  {
  current_page: 0,	//each page has 20 posts
  total_posts: 0,
  did_initial_load: false
};

export default function pages(state = initialState, action) {
  switch (action.type) {

  	case DID_INITIAL_LOAD: {
  		const newState = Object.assign({}, state);
  		newState.did_initial_load = true;
  		return newState;
  	}

    default:
      return state;
  }
}