import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';
import CommentService from './CommentService';

class Post extends Component {

	componentDidMount() {
		//Load the post with the given postId
		var post = {};
		this.loadPost(this.props.match.params.postId);
	}

	loadPost(postId) {
		var constants = require('../constants.json');

		axios.get(constants.api_url + 'posts/view/' + postId, {
			headers: {
        'Authorization': localStorage.getItem('jwt-token')
      }
		})
		.then(response => {
    	var responseData = response.data;
    	var postObject = {};
    	postObject.id = responseData._id;
    	postObject.text = responseData.post;
    	postObject.upvotes = responseData.upvotes;
    	postObject.downvotes = responseData.downvotes;
    	postObject.dateObject = responseData.dateObject;
    	postObject.dateString = responseData.dateString;
    	postObject.comments = responseData.comments.slice();
    	this.props.actions.loadPost(postObject);
    })
    .catch(function (error) {

    });
	}

	render() {
		return (
			<div className="row_container" height="800px" style={{"margin-top": "50px"}}>
          <div width="100%" height="200px">
            
            <div className="post_container">
              <div className="container">
                <div className="left">
                  <img className="left_quote" src={require('../images/left_quote.png')} />
                </div>

                <div className="text_div">
                  <p className="post_text">{this.props.currentPost.text}</p>
                </div>

                <div className="right">
                  <div>
                    <img width="28px" style={{cursor: "pointer"}} src={require('../images/upvote.png')} />
                  </div>

                  <div>
                    <p className="votes_text">+{this.props.currentPost.upvotes}/-{Math.abs(this.props.currentPost.downvotes)}</p>
                  </div>
                  <div>
                    <img width="28px" style={{cursor: "pointer"}} src={require('../images/downvote.png')} />
                  </div>
                </div>
              </div>

              <div className="post_info">
                <p className="info_text">{this.props.currentPost.dateString}</p>
              </div>
            </div>
          
          </div>

          <div width="100%" style={{"padding-bottom": "15px"}}>
            <div>
              {this.tabComments()}
            </div>
          </div>

          <div className="submit_fml_container">
          <a href="/" className="back">Read FMLs</a>
          <a href="/add-post" className="submit_fml">Submit an FML</a>
        </div>
      </div>
		);
	}

	//Iterate through all posts, generate table rows
  tabComments() {
    if(this.props.currentPost.comments instanceof Array){
      return this.props.currentPost.comments.map(function(comment, i) {
          if (comment.comments != undefined && comment.comments.length != 0) {  //Only show approved posts. the approved tag is changed in mlab
            return (
              <div>
              <hr className="line" style={{"margin-left": 15}} /><p className="comment"><b>{comment.author}</b> | {comment.timeString}</p>
              <p className="comment">{comment.text}</p>

              {this.tabReplies(comment.comments, 1)}

              </div>)
          } else {
            return
            <div>
              <hr className="line" style={{"margin-left": 15}} /><p className="comment"><b>{comment.author}</b> | {comment.timeString}</p>
              <p className="comment">{comment.text}</p>
            </div>
          }
      }, this)
    }
  }

  tabReplies(comments, level) {
    return comments.map(function(reply, i) {
      if (reply.comments != undefined && reply.comments.length != 0) {  //Only show approved posts. the approved tag is changed in mlab
        return (<div>
          <hr className="line" style={{"margin-left": 15 + (level * 30)}} /><p className="comment" style={{"margin-left": 15 + (level * 30)}}><b>{reply.author}</b> | {reply.timeString}</p>
        <p className="comment" style={{"margin-left": 15 + (level * 30)}}>{reply.text}</p>

        {this.tabReplies(reply.comments, level + 1)}

        </div>)
      } else {
        return
        <div>
          <hr className="line" style={{"margin-left": 15 + (level * 30)}} /><p className="comment" style={{"margin-left": 15 + (level * 30)}}><b>{reply.author}</b> | {reply.timeString}</p>
          <p className="comment" style={{"margin-left": 15 + (level * 30)}}>{reply.text}</p>
        </div>
      }
    }, this)
  }
}

//Access with this.props.postData
function mapStateToProps(state) {
  return {
  	posts: state.posts.data,
    currentPost: state.currentpost
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);