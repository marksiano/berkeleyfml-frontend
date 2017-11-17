// IndexPost.js

import React, { Component } from 'react';
import PostService from './PostService';
import axios from 'axios';
import TableRow from './TableRow';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { bindActionCreators } from 'redux';

class IndexPost extends Component {

  constructor(props) {
      super(props);
      this.addPostService = new PostService();
    }

    componentWillReceiveProps(nextProps) {
      var constants = require('../constants.json');

      console.log("Component will receive props");
      if (this.props.posts.posts.data.updating == true) {
        console.log("Updating");
        return;
      } else if (this.props.pages.did_initial_load == false && localStorage.getItem('jwt-token') != undefined) {  //LOCAL STORAGE IS FUCKING ASYNC. WAIT UNTIL TIS NOT NULL
        this.props.actions.didInitialLoad();  //Prevent the initial load from happening twice
        console.log("Current JWT Token: " + JSON.stringify(localStorage));
          axios.get(constants.api_url + 'posts/offset/' + (+this.props.posts.posts.data.offset), {
          headers: {
            'Authorization': localStorage.getItem('jwt-token')
          }})
      .then(response => {
        this.props.actions.updatePages();
        console.log("API GET data: " + JSON.stringify(response.data));
        this.props.onLoad(response.data);
        //this.setState({ posts: response.data });
      })
      .catch(function (error) {
        console.log("ERRPR: " + error);
      })
      }
    }

    componentDidMount() {
      console.log("Component did mount");
    }

    //Iterate through all posts, generate table rows
    tabRow() {
      if(this.props.postData instanceof Array){
        return this.props.postData.map(function(object, i){
            //Object is the individual post, passed to TableRow
            //console.log("Post comments: " + JSON.stringify(object.comments));
            if (object.approved == "true") {  //Only show approved posts. the approved tag is changed in mlab
              return <TableRow onUpvote={this.props.onUpvote} onDownvote={this.props.onDownvote} obj={object} key={i} comments={object.comments} />;
            } else {
              return null;
            }
        }, this)
      }
    }

    render() {
      return (
        <div className="table_container">
          <div className="title_div">
            <div className="title_container">
              <p className="title_text">Berkeley FML</p>
              <p className="description_text">F*ck My Life @ Berkeley</p>
            </div>
          </div>
          {this.tabRow()}
        </div>
      );
    }
  }

  //Access with this.props.postData
  function mapStateToProps(state) {
    return {
      posts: state,
      pages: state.pages,
      authorization: state.authorization.authorization
    };
  }

  function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPost);