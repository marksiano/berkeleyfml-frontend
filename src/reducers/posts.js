import { REQUEST_POSTS, UPVOTE_POST, UPDATE_PAGES, DONE_UPDATING, OPEN_REPLY_BOX, POST_COMMENT } from '../actions';

const initialState =  {
  data: {
    offset: 0,
    requestedPages: false,
    replyBoxPostId: -1, //Keeps track of the current post the reply box is visible in
    replyBoxCommentId: -1 //Keeps track of the current comment the reply box is visible in
  }
};

export default function posts(state = initialState, action) {

  var constants = require('../constants.json');

  switch (action.type) {

    /* The action called once posts have been fetched. Saves them to state, which causes UI to update */
    case REQUEST_POSTS:
      if (state.data.docs == undefined) {
        return {
          ...state, data: {
            ...action.data,
            offset: state.data.offset,
            requestedPages: true,
            replyBoxPostId: state.data.replyBoxPostId,
            replyBoxCommentId: state.data.replyBoxCommentId
          }
        }
      } else {  // If posts are already loaded into state, append the new posts
        var currentDocs = state.data.docs.slice();
        for (var i = 0; i < action.data.docs.length; i++) {
          currentDocs.push(action.data.docs[i]);
        }

        return {
          ...state, data: {
            ...state.data,
            docs: currentDocs,
            offset: state.data.offset,
            requestedPages: true,
            replyBoxPostId: state.data.replyBoxPostId,
            replyBoxCommentId: state.data.replyBoxCommentId
          }
        }
      }

    /* Switch the "updating" variable to on and increase the offset, triggers InfiniteScroll to load new posts based on the offset */
    case UPDATE_PAGES:
      return {
        ...state, data: {
          ...state.data,
          offset: state.data.offset + constants.offset,
          updating: true,
          replyBoxPostId: state.data.replyBoxPostId,
          replyBoxCommentId: state.data.replyBoxCommentId
        }
      }

    /* Switch the "updating" variable to false */
    case DONE_UPDATING: {
      return {
        ...state, data: {
          ...state.data,
          offset: state.data.offset,
          updating: false,
          replyBoxPostId: state.data.replyBoxPostId,
          replyBoxCommentId: state.data.replyBoxCommentId
        }
      }
    }

    case OPEN_REPLY_BOX:
      return {
        ...state, data: {
          ...state.data,
          offset: state.data.offset,
          updating: state.data.updating,
          replyBoxPostId: action.postId,
          replyBoxCommentId: action.commentId
        }
      }

    case POST_COMMENT:
      const newState = Object.assign({}, state);

      //We are given a postID in the action. Find the doc with that postID to post the comment to.
      for (var i = 0; i < newState.data.docs.length; i++) {
        if (newState.data.docs[i]._id == action.postId) {
          newState.data.docs[i] = {
            ...newState.data.docs[i],
            comments: action.newComments,
            numComments: action.numComments
          }
          break;
        }
      }

      return newState;

    /* Default reducer: return the state with no changes */
    default:
      return state;
  }
}