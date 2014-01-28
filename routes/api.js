var mongoose = require('mongoose'),
  FeedParser = require('feedparser'),
  request = require('request'),
  _ = require('underscore'),
  Q = require('q');

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

function checkRSSHelper(feedUrl) {
  var results = {},
    deferred = Q.defer();

  var website;

  request(feedUrl)
  .pipe(new FeedParser())
  .on('error', function(error) {
    console.error(error);
  })
  .on('meta', function(meta) {
    console.log('meta data:');
    website = meta.link;
    results[website] = [];
  })
  //is called for every article
  .on('readable', function() {
    var stream = this, item;

    while (item = stream.read()) {

      var temp = {
        text: item.description.toLowerCase(),
        link: item.link,
        author: item.author,
        title: item.title
      }

      results[website].push(temp);
      
    } //end while loop
  })
  .on('end', function() {
    console.log('closing stream');
    deferred.resolve(results);
  })
  return deferred.promise;
}


 exports.checkRSS = function(req, res) {

  var blogUrls = ['http://simplymommie.com/feed', 'http://miracule.blogspot.com/feeds/posts/default', 
    'http://littlebluebottle.blogspot.com/feeds/posts/default', 'http://kidsrsimple.com/feed/'],
    results = {},
    currPromise = Q(1);

  if (blogUrls.length > 0) currPromise = checkRSSHelper(blogUrls[0]);

  for (var i = 1, len = blogUrls.length; i < len; i++) {
    console.log('looping');

    (function(num){

      currPromise = currPromise.then(function(data) {
        //takes the posts that contains the keywords and combines it with the results object
        results = _.extend(results, data);
        //returns a promise
        return checkRSSHelper(blogUrls[num]);
      });

    })(i);

  }

  // use a promise to ensure that json is returned only after all the blogs have been checked
  currPromise.then(function(data) {
    results = _.extend(results, data);
    return res.json({
      results: results
    })     
  })

  // var results = {};
  // //use a promise to ensure that json is returned only after all the blogs have been checked
  // checkRSSHelper('http://simplymommie.com/feed').
  // then(function() {
  //   return checkRSSHelper('http://miracule.blogspot.com/feeds/posts/default')
  // }).
  // then(function(data) {
  //   console.log('promised stuff');
  //   console.log(data);
  //   results = _.extend(results, data);
  //   return res.json({
  //     results: results
  //   })      
  // })
 }

/* 
 * PUT 
 */ 
 exports.editPost = function(req, res) {
  if (req.body) {
    console.log(req.body.categories)
    var title = req.body.title,
      text = req.body.text,
      categories = req.body.categories,
      id = req.params.id;
    }

  console.log(id)
  Post.findOneAndUpdate({queryKey: id}, {
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