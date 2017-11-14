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

    function loadFunc() {
      console.log("Updating: " + JSON.stringify(this.props.pages.data));
      //First time calling the func, updating = false (we will set it to true after we make the call so the call is only made once)
      if (this.props.pages.data.updating == true) {
        console.log("Updating");
        return;
      } else {
      console.log("Loading offset");
      console.log("Getting with offset: " + (this.props.pages.data.offset + 2));
        axios.get('http://localhost:4200/posts/offset/' + (+this.props.pages.data.offset + 2))
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

      {/*<Modal isOpen={this.props.modal.activated} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>*/}

        <div className="App">
          <p className="App-intro">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc.bind(this)}
            hasMore={this.props.requestedPages == true && (this.props.pages.data.docs == undefined || this.props.pages.data.offset + 2 < this.props.pages.data.total)}
            loader={<div className="loader">Loading...</div>}
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
    modal: state.modal
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);