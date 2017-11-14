import { REQUEST_POSTS, UPVOTE_POST, REHYDRATION_COMPLETE } from '../actions';

const initialState =  {
  current_page: 0,	//each page has 20 posts
  total_posts: 0
};

export default function pages(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}