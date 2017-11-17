// CommentService.js

import axios from 'axios';

class CommentService {

  //data is the data received from the TableRow component
  sendData(postId, data, numComments) {
    var constants = require('../constants.json');
    axios.post(constants.api_url + 'posts/comment/' + postId, {
      comments: data,
      numComments: numComments
    }, {
          headers: {
            'Authorization': localStorage.getItem('jwt-token')
          }})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default CommentService;