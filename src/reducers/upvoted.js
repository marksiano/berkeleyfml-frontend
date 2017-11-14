import { REQUEST_POSTS, UPVOTE_POST, DOWNVOTE_POST, REHYDRATION_COMPLETE } from '../actions';

const initialState =  {
  upvoted: [],
  downvoted: []
};

export default function upvoted(state = initialState, action) {
  switch (action.type) {
    
    case UPVOTE_POST:
      //Add the ID of the upvoted post to the upvoted posts list (state.upvoted = undefined if no posts have been upvoted yet)
      if (state.upvoted == undefined) {
        return {
          ...state, upvoted: [action.post_id]
        }
      } else {
        var upvoted = state.upvoted.slice();
        if (upvoted.indexOf(action.post_id) != -1) {
          upvoted.splice(upvoted.indexOf(action.post_id), 1);
        } else {
          upvoted.push(action.post_id);
        }

        return {
          ...state, upvoted: upvoted
        }
      }

    case DOWNVOTE_POST:
      if (state.downvoted == undefined) {
        return {
          ...state, downvoted: [action.post_id]
        }
      } else {
        var downvoted = state.downvoted.slice();
        if (downvoted.indexOf(action.post_id) != -1) {
          downvoted.splice(downvoted.indexOf(action.post_id), 1);
        } else {
          downvoted.push(action.post_id);
        }

        return {
          ...state, downvoted: downvoted
        }
      }

    default:
      return state;
  }
}