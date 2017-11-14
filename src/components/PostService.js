// PostService.js

import axios from 'axios';

class PostService {

  //data is the data received from the AddPost component
  sendData(data) {
    var today = new Date();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var date = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
    axios.post('http://localhost:4200/posts/add/post', {
      post: data.value,
      approved: data.approved,
      upvotes: 0,
      downvotes: 0,
      dateObject: today,
      dateString: date
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default PostService;