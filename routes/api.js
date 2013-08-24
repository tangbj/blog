var mongoose = require('mongoose');

require('../models/post');
var Post = mongoose.model('Post');
var markdown = require('markdown').markdown;

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
    if (err || results.length === 0) return res.send(500, 'broken');;
    //converts to markdown format
    for(var i = 0, len = results.length; i < len; i++) {
      results[i].text = markdown.toHTML(results[i].text);
    }
    return res.json(results);
  })
}



//helper function that loops through each post, removes some html tags, and saves the document
// // function() {
  //   Post.find({}, function(err, results) {
  //   for(var i = 0, len = results.length; i < len; i++) {
  //     results[i].text = results[i].text.replace(/\<br\>|<source>|<\/source>|<b>|<\/b>|<em>|<\/em>/g, '');
  //     console.log(results[i].text)
  //     results[i].save();
  //   }
  //   return res.json(results)
  // })
// }

exports.getPost = function(req, res) {
  var queryKey = req.params.queryKey;
  Post.find({queryKey: queryKey}, function(err, results) {
    if(err || results.length === 0) {
      console.log('Error');
      return res.send(404, 'broken');
    }
    //converts to markdown format
    results[0].text = markdown.toHTML(results[0].text);
    return res.json(results);
  })
}


/* 
 * POST 
 */

//creates a new post
exports.newPost = function(req, res) {
  console.log(req.body)
  if (req.body) {
    var title = req.body.title,
      text = req.body.text,
      categories = req.body.categories.split(' ');
      queryKey = req.body.queryKey;
    console.log(req.body.queryKey)
    Post.create({
      title: title,
      text: text,
      categories: categories,
      queryKey: queryKey
    }, function(err, result) {
      if (err) throw err;

      return res.json({
        status: 'okay'
      });
    })
  }
 }

/* 
 * PUT 
 */ 
 exports.editPost = function(req, res) {
  console.log('tataa')
  if (req.body) {
    console.log(req.body.categories)
    var title = req.body.title,
      text = req.body.text,
      categories = req.body.categories,
      id = req.params.id;
    }

  Post.findOneAndUpdate({_id: id}, {
    title: title, 
    text: text, 
    categories: categories}, function(err, results) {
    if(err) {
      console.log('Error');
      return;
    }
    return res.json( {
      status: 'okay'
    })
  });
 }