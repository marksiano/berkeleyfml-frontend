// Post.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

// Define collection and schema for Posts
var Post = new Schema({
  post: {
    type: String
  },
  approved: {
  	type: String
  },
  upvotes: {
  	type: Number
  },
  downvotes: {
  	type: Number
  },
  comments: {
    type: Array
  },
  numComments: {
    type: Number
  },
  dateObject: {
    type: Date
  },
  dateString: {
    type: String
  }
}, {
    collection: 'posts'
});

Post.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', Post);