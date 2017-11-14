// ReplyBox.js

import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { FormGroup, Label, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';

import CommentService from './CommentService';

class ReplyBox extends Component {

  constructor(props) {
    super(props);
    this.commentService = new CommentService();

    this.updateAuthorValue = this.updateAuthorValue.bind(this);
    this.updateCommentValue = this.updateCommentValue.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
  }

  render() {
  	return (
  		<div className="reply_box">
	  		<div>
		     	<InputGroup>
		        	<InputGroupAddon>Speaking as: </InputGroupAddon>
		        	<Input onChange={this.updateAuthorValue} style={{width:"100%","border-color":"#CCCCCC"}} placeholder="anonymous" name="text" id="exampleText" />
		      	</InputGroup>
		    </div>

		    <Input onChange={this.updateCommentValue} style={{width:"100%", "resize":"none", "margin-top":"10px", "height":"100px","border-color":"#CCCCCC"}} type="textarea" name="text" id="exampleText" />
		    <div>
		    	<Button className="submit_button" color="primary" onClick={() => this.addComment(this.props.commentData.currentAuthorText, this.props.commentData.currentCommentText)}>Submit</Button>
		    	<Button className="cancel_button" onClick={() => this.cancelReply()} color="secondary">Cancel</Button>
		    </div>
	    </div>
  	);
  }

  cancelReply() {
  	this.props.actions.openReplyBox(-1, -1);
  	this.props.actions.authorUpdated(null);
  	this.props.actions.commentUpdated(null);
  }

  //Triggered when the author field for a comment changes
  updateAuthorValue(e) {
  	this.props.actions.authorUpdated(e.target.value);
  }

  //Triggered when the comment field for a ReplyBox changes (every key stroke) to update state
  updateCommentValue(e) {
  	this.props.actions.commentUpdated(e.target.value);
  }

  //Iterates through the comments JSON dictionary. Returns the comment object with the given id, null if none is found
  commentWithId(comments, id) {	//An array and the id we are looking for
  	for (var i = 0; i < comments.length; i++) {
  		if (comments[i]._id == id) {
  			return comments[i];
  		}
  		if (comments[i].comments.length != 0) {
  			var deepComment = this.commentWithId(comments[i].comments, id);
  			if (deepComment != null) {
  				return deepComment;
  			}
  		}
  	}

  	return null;
  }

  addComment(author, text) {

  	if (text == null || text.length < 20) {
  		alert("Reply too short");
  		return;
  	}

    //Iterate through posts to find the post with the right id

    this.props.actions.openReplyBox(-1, -1);

    for (var i = 0; i < this.props.posts.docs.length; i++) {
      var currentDoc = this.props.posts.docs[i];
      console.log(JSON.stringify(currentDoc));
      console.log(this.props.commentId + " - " + this.props.postId);
      if (currentDoc._id == this.props.postId) { //Found it
        //alert("Post id: " + currentDoc._id);

        var currentComments = currentDoc.comments.slice();

        //Check the number of current comments, so we can assign id = num_comments + 1 to the next one, preserving uniqueness of ID
        const numComments = currentDoc.numComments == undefined ? 0 : currentDoc.numComments;

        //If we're replying to a comment, we need to look through the comments
        if (this.props.commendId != -1) {
	        var commentObject = {};
	        commentObject.author = author == null ? 'anonymous' : author;
	        commentObject.text = text;
	        commentObject.comments = [];
	        commentObject._id = numComments + 1;

	        var today = new Date();
  			var h = today.getHours();
  			var m = today.getMinutes();
  			var suffix =  h >= 12 ? " pm" : " am";

  			if (h > 12) {
  				h -= 12;
  			}

  			var timeString = h + ':' + m + suffix;
  			if (m < 10) {
  				timeString = h + ':0' + m + suffix;
  			}


  			commentObject.timeString = timeString;

	        //Go through the comments, find the comment with the right id (this is the one you are replying to)
	        var comment = this.commentWithId(currentComments, this.props.commentId);

	        if (comment != null) {
	        	comment.comments.push(commentObject);
	        	this.commentService.sendData(this.props.postId, currentComments, numComments + 1);
	        	this.props.actions.postComment(currentComments, currentDoc._id, this.props.commentId, numComments + 1);
	        	return;
	        }
    	}

        currentComments.push(commentObject);
        this.commentService.sendData(this.props.postId, currentComments, numComments + 1);
        this.props.actions.postComment(currentComments, currentDoc._id, this.props.commentId, numComments + 1);
        return;
      }
    }
  }
}

//Access with this.props.
function mapStateToProps(state) {
  return {
    upvotedPosts: state.upvoted.upvoted,
    posts: state.posts.data,
    commentData: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyBox);