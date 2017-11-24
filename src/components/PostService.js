// PostService.js

import axios from 'axios';

class PostService {
  //data is the data received from the AddPost component
  sendData(data) {
    var constants = require('../constants.json');

    var today = new Date();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    var date = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
    axios.post(constants.api_url + 'posts/add/post', {
      post: data.value,
      approved: data.approved,
      upvotes: 0,
      downvotes: 0,
      dateObject: today,
      dateString: date
    }, {
    headers: {
      'Authorization': localStorage.getItem('jwt-token')
    }})
    .then(function (response) {
        
    })
    .catch(function (error) {

    });
  }
}

export default PostService;