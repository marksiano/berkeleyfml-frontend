// IndexPost.js

import React, { Component } from 'react';
import PostService from './PostService';
import axios from 'axios';
import TableRow from './TableRow';
import { connect } from 'react-redux';

class IndexPost extends Component {

  constructor(props) {
      super(props);
      this.addPostService = new PostService();
    }

    componentDidUpdate() {
      
    }

    componentDidMount(){
      axios.get('http://localhost:4200/posts')
      .then(response => {
        console.log("API GET data: " + JSON.stringify(response.data));
        this.props.onLoad(response.data);
        //this.setState({ posts: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
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
      posts: state
    };
  }

export default connect(mapStateToProps)(IndexPost);