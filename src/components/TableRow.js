// TableRow.js

import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import { FormGroup, Label, Input, Button } from 'reactstrap';

import CommentService from './CommentService';
import ReplyBox from './ReplyBox';

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.commentService = new CommentService();
  }

  render() {
    console.log("Upvoted posts: " + JSON.stringify(this.props.upvotedPosts));
    return (
        <div className="row_container" height="800px">
          <div width="100%" height="200px">
            
            <div className="post_container">
              <div className="container">
                <div className="left">
                  <img className="left_quote" src={require('../images/left_quote.png')} />
                </div>

                <div className="text_div">
                  <p className="post_text">{this.props.obj.post}</p>
                </div>

                <div className="right">
                  <div>
                    <img width="28px" style={{cursor: "pointer"}} src={require('../images/upvote.png')} onClick={() => this.upvotePressed(this.props.obj._id)} />
                  </div>

                  <div>
                    <p className="votes_text">+{this.props.obj.upvotes}/-{Math.abs(this.props.obj.downvotes)}</p>
                  </div>
                  <div>
                    <img width="28px" style={{cursor: "pointer"}} src={require('../images/downvote.png')} onClick={() => this.downvotePressed(this.props.obj._id)}/>
                  </div>
                </div>
              </div>

              <div className="post_info">
                <p className="info_text">{this.props.obj.dateString} | <a className="reply_link" onClick={() => this.onCommentClick(this.props.obj._id)}>Reply</a></p>
              </div>
            </div>
          
          </div>

          <div width="100%" style={{"padding-bottom": "15px"}}>
            <div>
              {this.tabComments()}
            </div>
            {
              this.props.posts.replyBoxPostId == this.props.obj._id && this.props.posts.replyBoxCommentId == -1
              && 
              <div className="reply_box_container">
                <ReplyBox postId={this.props.obj._id} commentId="-1" />
              </div>}
          </div>
        </div>
    );
  }

  onCommentClick(postId) {
    this.props.actions.openReplyBox(postId, -1);
  }

  onReplyClick(postId, commentId) {
    console.log("Data received: " + postId + ", " + commentId);
    this.props.actions.openReplyBox(postId, commentId);
    //this.commentService.sendData(postId, commentId, "Fucker");
  }

  //Iterate through all posts, generate table rows
  tabComments() {
    if(this.props.comments instanceof Array){
      return this.props.comments.map(function(comment, i) {
          //Object is the individual post, passed to TableRow
          if (comment.comments != undefined && comment.comments.length != 0) {  //Only show approved posts. the approved tag is changed in mlab
            return (
              <div>
              <hr className="line" style={{"margin-left": 15}} /><p className="comment"><b>{comment.author}</b> | {comment.timeString} | <a className="reply_link" onClick={() => this.onReplyClick(this.props.obj._id, comment._id)}>Reply</a></p>
              <p className="comment">{comment.text}</p>
              {
                this.props.posts.replyBoxCommentId == comment._id && this.props.posts.replyBoxPostId == this.props.obj._id
                  && 
                  <div className="reply_box_container">
                    <ReplyBox postId={this.props.obj._id} commentId={comment._id} />
                  </div>
              }
              {this.tabReplies(comment.comments, 1)}

              

              </div>)
          } else {
            return <div>
            <hr className="line" style={{"margin-left": 15}} /><p className="comment"><b>{comment.author}</b> | {comment.timeString} | <a className="reply_link" onClick={() => this.onReplyClick(this.props.obj._id, comment._id)}>Reply</a></p>
            <p className="comment">{comment.text}</p>

            {
              this.props.posts.replyBoxCommentId == comment._id && this.props.posts.replyBoxPostId == this.props.obj._id
                && 
              <div className="reply_box_container">
                <ReplyBox postId={this.props.obj._id} commentId={comment._id} />
              </div>
            }

            </div>
          }
      }, this)
    }
  }

  tabReplies(comments, level) {
    return comments.map(function(reply, i) {
          //Object is the individual post, passed to TableRow
          //console.log("Post comments: " + JSON.stringify(object.comments));
          if (reply.comments != undefined && reply.comments.length != 0) {  //Only show approved posts. the approved tag is changed in mlab
            return (<div>
              <hr className="line" style={{"margin-left": 15 + (level * 30)}} /><p className="comment" style={{"margin-left": 15 + (level * 30)}}><b>{reply.author}</b> | {reply.timeString} | <a className="reply_link" onClick={() => this.onReplyClick(this.props.obj._id, reply._id)}>Reply</a></p>
            <p className="comment" style={{"margin-left": 15 + (level * 30)}}>{reply.text}</p>

            {
              this.props.posts.replyBoxCommentId == reply._id && this.props.posts.replyBoxPostId == this.props.obj._id
                && 
              <div className="reply_box_container">
                <ReplyBox postId={this.props.obj._id} commentId={reply._id} />
              </div>
            }

            {this.tabReplies(reply.comments, level + 1)}

            </div>)
          } else {
            return <div>
            <hr className="line" style={{"margin-left": 15 + (level * 30)}} /><p className="comment" style={{"margin-left": 15 + (level * 30)}}><b>{reply.author}</b> | {reply.timeString} | <a className="reply_link" onClick={() => this.onReplyClick(this.props.obj._id, reply._id)}>Reply</a></p>
            <p className="comment" style={{"margin-left": 15 + (level * 30)}}>{reply.text}</p>

            {
              this.props.posts.replyBoxCommentId == reply._id && this.props.posts.replyBoxPostId == this.props.obj._id
                && 
              <div className="reply_box_container">
                <ReplyBox postId={this.props.obj._id} commentId={reply._id} />
              </div>
            }

            </div>
          }
      }, this)
    }

  upvotePressed(post_id) {
    if (this.props.upvotedPosts != undefined && this.props.upvotedPosts.indexOf(post_id) != -1) {
      this.props.onUpvote(post_id);
      this.props.obj.upvotes -= 1;
      this.forceUpdate();
      axios.post('http://localhost:4200/posts/upvote/' + post_id + '/true') //The true indicates that the post was previously upvoted
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      return;
    }

    this.props.onUpvote(post_id);
    this.props.obj.upvotes += 1;
    this.forceUpdate();
    axios.post('http://localhost:4200/posts/upvote/' + post_id + '/false')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  downvotePressed(post_id) {
    if (this.props.downvotedPosts != undefined && this.props.downvotedPosts.indexOf(post_id) != -1) {
      this.props.onDownvote(post_id);
      this.props.obj.downvotes -= 1;
      this.forceUpdate();
      axios.post('http://localhost:4200/posts/downvote/' + post_id + '/true')
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      return;
    }

    this.props.onDownvote(post_id);
    this.props.obj.downvotes += 1;
    this.forceUpdate();
    axios.post('http://localhost:4200/posts/downvote/' + post_id + '/false')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

//Access with this.props.
function mapStateToProps(state) {
  return {
    upvotedPosts: state.upvoted.upvoted,
    downvotedPosts: state.upvoted.downvoted,
    posts: state.posts.data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);