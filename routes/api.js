var mongoose = require('mongoose');

require('../models/post');
var Post = mongoose.model('Post');
/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.getAllPosts = function(req, res) {
  Post.find({}, function(err, results) {
    if (err) throw err;
    return res.json(results);
  })
}


/* 
 * POST 
 */

//creates a new post
exports.newPost = function(req, res) {
  if (req.body) {
    var title = req.body.title,
      text = req.body.text,
      categories = req.body.categories.split(' ');

    Post.create({
      title: title,
      text: text,
      categories: categories
    }, function(err, result) {
      if (err) throw err;

      return res.json({
        status: 'okay'
      });
    })
  }
 }