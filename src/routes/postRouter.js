// postRouter.js

var express = require('express');
var app = express();
var postRouter = express.Router();

// Require Post model in our routes module
var Post = require('../models/Post');
var constants = require('../constants.json');

// Defined store route
postRouter.route('/add/post').post(function (req, res) {
  var post = new Post(req.body);
      post.save()
    .then(post => {
    res.json('Post added successfully');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRouter.route('/').get(function (req, res) {
  Post.paginate({}, {offset: 0, limit: constants.offset}, function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});

// Defined get data(index or listing) route
postRouter.route('/offset/:offset').get(function (req, res) {
  console.log("Getting with offset");
  Post.paginate({}, {offset: +req.params.offset, limit: constants.offset}, function (err, posts){
    if(err){
      console.log(err);
    }
    else {
      res.json(posts);
    }
  });
});

// Defined edit route
postRouter.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Post.findById(id, function (err, post){
      res.json(post);
  });
});

//  Defined update route
postRouter.route('/update/:id').post(function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      post.post = req.body.post;

      post.save().then(post => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Upvote a post
postRouter.route('/upvote/:id/:upvoted').post(function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post)
      return next(new Error('Could not load Document'));
    else {
      if (req.params.upvoted == "true") {
        post.upvotes -=1;
      } else {
        post.upvotes += 1;
      }

      post.save().then(post => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send('unable to update the database');
      })
    }
  });
});

// Downvote a post
postRouter.route('/downvote/:id/:downvoted').post(function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post)
      return next(new Error('Could not load Document'));
    else {
      if (req.params.downvoted == "true") {
        post.downvotes -= 1;
      } else {
        post.downvotes += 1;
      }

      post.save().then(post => {
        res.json('Update complete - ' + JSON.stringify(req.params));
      })
      .catch(err => {
        res.status(400).send('unable to update the database');
      })
    }
  });
});

// Defined delete | remove | destroy route
postRouter.route('/delete/:id').get(function (req, res) {
  Post.findByIdAndRemove({_id: req.params.id},
       function(err, post){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

// Update the comments of a post
postRouter.route('/comment/:id').post(function (req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (!post)
      return next(new Error('Could not load Document'));
    else {
      post.comments = req.body.comments;
      post.numComments = req.body.numComments;

      post.save().then(post => {
        res.json('Update complete: ' + req.body.numComments)
      })
      .catch(err => {
        res.status(400).send('unable to update the database');
      })
    }
  });
});

module.exports = postRouter;