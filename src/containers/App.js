import React, { Component } from 'react';
import logo from './logo.svg';
import '../styles/App.css';
import IndexPost from '../components/IndexPost.js'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import '../styles/App.css';
import { connect } from 'react-redux';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroller';

class App extends Component {

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.props.actions.toggleSubmitModal();
  }

  render() {
    //Receive JWT token and store in local storage, then change state once received
    //If not authorized, perform the authorization

    var credentials = require('../credentials.json');
    var constants = require('../constants.json');

    if (!this.props.authorization.authorized) {
      axios.post(constants.api_url + 'posts/authenticate', {
        username: credentials.username,
        password: credentials.password
      })
      .then(response => {
        console.log("Got JWT Token");
        localStorage.setItem('jwt-token', 'Bearer ' + response.data);
        console.log("DONE SETTING: " + localStorage.getItem('jwt-token'));
        this.props.actions.authorize();
      })
      .catch(error => {
        console.log("Error: " + JSON.stringify(error));
      });
    }

    function loadFunc() {
      console.log("Updating: " + JSON.stringify(this.props.pages.data));
      //First time calling the func, updating = false (we will set it to true after we make the call so the call is only made once)
      if (this.props.pages.data.updating == true) {
        console.log("Updating");
        return;
      } else {
      console.log("Loading offset");
      console.log("Getting with offset: " + (this.props.pages.data.offset));
        axios.get(constants.api_url + 'posts/offset/' + (+this.props.pages.data.offset), {
          headers: {
            'Authorization': localStorage.getItem('jwt-token')
          }})
        .then(response => {
          this.props.actions.updatePages(); //Update pages increases the offset so we get with a new offset next time.
          /*
            The reason we manually increase the offset when getting is because the action is fired async-ly, so we'll be using the old
            offset value when trying to get from a new noffset
          */
          console.log("New scrolling data: " + JSON.stringify(response.data));
          var r = JSON.parse(JSON.stringify(response.data));
          if (this.props.pages.data.updating == true) {
            r["updating"] = true;
          }
          this.props.actions.requestPosts(r);
          this.props.actions.doneUpdating();
          //this.setState({ posts: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }

    return (
      <div className="parent_container">

        <div className="App">
          <p className="App-intro">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc.bind(this)}
            hasMore={this.props.requestedPages == true && (this.props.pages.data.docs == undefined || this.props.pages.data.offset < this.props.pages.data.total)}
            loader={<div className="loader"></div>}
        >
            {<IndexPost onDownvote={this.props.actions.downvotePost} onUpvote={this.props.actions.upvotePost} onLoad={this.props.actions.requestPosts} postData={this.props.posts} />}
        </InfiniteScroll>
          </p>

        </div>

        <div className="submit_fml_container">
          <a href="/add-post" className="submit_fml">Submit an FML</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.data.docs,
    downvotedPosts: state.posts.downvoted,
    rehydrationComplete: state.rehydration.completed,
    pages: state.posts,
    requestedPages: state.posts.data.requestedPages,
    modal: state.modal,
    authorization: state.authorization
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);