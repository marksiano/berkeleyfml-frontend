// CommentService.js

import axios from 'axios';

class CommentService {

  //data is the data received from the TableRow component
  sendData(postId, data, numComments) {
    console.log("Num comments: " + numComments)
    axios.post('http://localhost:4200/posts/comment/' + postId, {
      comments: data,
      numComments: numComments
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default CommentService;