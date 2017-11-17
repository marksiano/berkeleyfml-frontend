export const REQUEST_POSTS = 'REQUEST_POSTS';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const REHYDRATION_COMPLETE = 'REHYDRATION_COMPLETE';
export const UPDATE_PAGES = 'UPDATE_PAGES';
export const DONE_UPDATING = 'DONE_UPDATING';
export const OPEN_REPLY_BOX = 'OPEN_REPLY_BOX';
export const POST_COMMENT = 'POST_COMMENT';
export const AUTHOR_UPDATED = 'AUTHOR_UPDATED';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const SUBMIT_FML = 'SUBMIT_FML';
export const AUTHORIZED = 'AUTHORIZED';
export const DID_INITIAL_LOAD = 'DID_INITIAL_LOAD';
export const LOAD_POST = 'LOAD_POST';

export function requestPosts(data) {
  return {
    type: REQUEST_POSTS,
    data: data
  }
}

export function upvotePost(post_id) {
	return {
		type: UPVOTE_POST,
		post_id: post_id
	}
}

export function downvotePost(post_id) {
	return {
		type: DOWNVOTE_POST,
		post_id: post_id
	}
}

export function rehydrationComplete() {
	return {
		type: REHYDRATION_COMPLETE
	}
}

export function updatePages() {
	return {
		type: UPDATE_PAGES
	}
}

export function doneUpdating() {
	return {
		type: DONE_UPDATING
	}
}

export function openReplyBox(postId, commentId) {
	return {
		type: OPEN_REPLY_BOX,
		postId: postId,
		commentId: commentId
	}
}

//If comment id == -1, it's just a comment to the post
export function postComment(newComments, postId, commentId, numComments) {
	return {
		type: POST_COMMENT,
		newComments: newComments,	//In the form of JSON
		postId: postId,
		commentId: commentId,
		numComments: numComments
	}
}

export function authorUpdated(text) {
	return {
		type: AUTHOR_UPDATED,
		text: text
	}
}

export function commentUpdated(text) {
	return {
		type: COMMENT_UPDATED,
		text: text
	}
}

export function toggleSubmitModal() {
	return {
		type: TOGGLE_MODAL
	}
}

export function submitFML(text) {
	return {
		type: SUBMIT_FML,
		text
	}
}

export function authorize() {
	return {
		type: AUTHORIZED
	}
}

export function didInitialLoad() {
	return {
		type: DID_INITIAL_LOAD
	}
}

export function loadPost(postObject) {
	return {
		type: LOAD_POST,
		id: postObject.id,
		text: postObject.text,
	    upvotes: postObject.upvotes,
	    downvotes: postObject.downvotes,
	    dateObject: postObject.dateObject,
	    dateString: postObject.dateString,
	    comments: postObject.comments.slice()
	}
}