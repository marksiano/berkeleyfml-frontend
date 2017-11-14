// AddPost.js

import React, { Component } from 'react';

import PostService from './PostService';
import { FormGroup, Label, Input, InputGroupAddon, InputGroup, Button } from 'reactstrap';

class AddPost extends Component {
  
    constructor(props) {
      super(props);
      this.state = {value: ''};
      this.addPostService = new PostService();

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      //alert(this.state.value);
      event.preventDefault();
      var postObject = {};
      postObject.value = this.state.value;
      postObject.approved = "false";
      postObject.upvotes = 0;
      postObject.downvotes = 0;
      this.addPostService.sendData(postObject);
      this.props.history.push('/');
    }

    render() {
      return (
          <div className="add_post_container">
            <form onSubmit={this.handleSubmit}>
              <label>
                Write your FML
              </label>
                {/*<input type="text" value={this.state.value} onChange={this.handleChange} className="form-control"/>*/}
                <InputGroup style={{width: "100%"}}>
                  <Input onChange={this.handleChange} style={{width:"100%", "resize":"none", "margin-top":"10px", "margin-bottom": "15px", "height":"100px","border-color":"#CCCCCC"}} type="textarea" name="text" id="exampleText" />
                </InputGroup>
              <input type="submit" value="Submit" className="btn btn-primary"/>
              <p className="submit_disclaimer">
                FMLs are anonymous. Allow 24 hours for your FML to be approved.
              </p>
            </form>
          </div>
      );
    }
}

export default AddPost;