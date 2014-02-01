'use strict';

/* Controllers */

//takes the title and the date of the post, and creates a key by concatenating them with '-'
//this is the unique key that will be used for queries
function createKey(title, date) {
  //takes the title, and replaces sensitive characters with dashes
  var dateToBeUsed = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  var titleToBeUsed = title.trim().replace(/\s+|\/|\\|&|,/g, '-');
  //if two sensitive characters are next to each other, will lead to '--', which is unsightly
  //replaces it with one dash instead
  return titleToBeUsed.replace(/-{2,}/g, '-') + '-' + dateToBeUsed;

}

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('BlogCtrl', ['$scope', '$http', '$routeParams', '$location',
    function ($scope, $http, $routeParams, $location) {

    console.log($routeParams.queryKey)
    var apiAddress;

    //if user is looking at the blog index, get all posts, otherwise get one post
    if ($routeParams.queryKey === '' || typeof $routeParams.queryKey === 'undefined') {
      apiAddress = '/api/getAllPosts';
    } else {
      apiAddress = '/api/getpost/' + $routeParams.queryKey;
    }

    $http.get(apiAddress).success(function(data) {
      $scope.posts = data;

      //for each post, edits the text based on special characters (e.g. \n)
      //and stores edited text in editedText attribute; this is what is shown in the blog
      _.each($scope.posts, function(post) {
        post.editedText = formatText(post.text);
      });
    }).error(function() {
      //if there is problem, redirect to main page
      console.log('error');
      $location.path('/blog');
    })

    //main function that splits the main text into paragraphs based on \n\n
    function formatText(text) {
      //splits the text into paragraphs, creates customised tags to record information 
      //about each portion, and stores in an array
      var results = _.map(text.split('\n\n'), function(paragraph) {
        return createTag('p', paragraph);
      });

      //converts each tag into HTML, before joining into a big string
      return _.map(results, convertTagToHtml).join('');
    }

    //helper function to store what sort of HTML tag to create
    function createTag(name, content, attributes) {
      if (typeof attributes === 'undefined') attributes = '';
      return {
        name: name,
        attributes: attributes,
        content: content
      }
    }

    function convertTagToHtml(tag) {
      return "<" + tag['name'] + " " + tag['attributes'] + ">" + 
        tag['content'] + "</" + tag['name'] + ">"
    }

  }]).
  controller('ProjectCtrl', function ($scope) {
    // write Ctrl here

  }).
  controller('NewPostCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.showSuccessMessage = false;
  

    $scope.submitPost = function (data) {
      data.queryKey = createKey(data.title, new Date());
      $http.post('api/newpost', data).success(function(val) {
        resetsFields($scope);
        $scope.showSuccessMessage = true;
      })
    }

    function resetsFields (scope) {
      scope.data = {};
    }

  }]).
  controller('EditPostCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var id = $location.path().split('/editpost/')[1];
    if(typeof id !== 'undefined') {
      $http.get('/api/getpost/' + id).success(function(data) {
        $scope.data = data[0];
      })
    }

    $scope.submitPost = function (data) {
      $http.put('api/editpost/' + id, data).success(function(val) {
        $scope.showSuccessMessage = true;
      })
    }
  }]).
  controller('ProjectCtrl', ['$scope', function($scope) {

  }]).
  controller('RSSCtrl', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.data = {};
    $scope.data.results = [];
    $scope.data.initialLoadMessage = 'Trawling in-progress';
    $scope.data.trawled = false;


    //basic animation of the text
    (function () {
      var i = 0;
      function animate() {
        var dots;
        //animate only if the rss hasn't been loaded
        if (!$scope.data.trawled) {
          $timeout(function() {

            //creates string with repeated dots; if i is 0, then no dots are created
            dots = new Array(i + 1).join('.');

            $scope.data.initialLoadMessage = 'Trawling in-progress' + dots;
            animate();
            //max of 7 dots are showed
            i = (i + 1) % 8;
          }, 200);                
        }
      }
      animate();
    })();

    //trawling different blogsites
    var startTime = Date.now();
    $http.get('/api/checkrss').success(function(results) {
      console.log('Time Elasped: ' + (Date.now() - startTime));
      var temp = results['results'];
      for(var key in temp) {
        for(var i = 0; i < temp[key].length; i++) {
          $scope.data.results.push({
            website: key,
            text: stripHTML(temp[key][i].text),
            title: temp[key][i].title,
            link: temp[key][i].link,
            show: false
          });
        }
      }
      console.log($scope.data.results);
      //once rss data has been downloaded, display search form
      $scope.data.trawled = true;
    })

    //function to strip HTML tags using the browser
    function stripHTML(html) {
      //strips out out any image tags to prevent system from loading all the images in the blog posts
      var regex = /<img.+?>/g,
        modifiedHTML = html.replace(regex, '');

      var div = document.createElement('div');
      div.innerHTML = modifiedHTML;
      return div.innerText;
    }

    function checkBlogPostContainsKeyWords(post, keywords) {
      var results = [];
      for (var i = 0; i < keywords.length; i++) {
        if (post.indexOf(keywords[i]) !== -1) {
          results.push(keywords[i]);
        }
      }
      return results;
    }

    $scope.checkWords = function() {
      if (typeof $scope.data.keywords !== 'undefined') {
        var arrKeywords = getKeywords($scope.data.keywords);
        _.each($scope.data.results, function(result) {
          // console.log(checkBlogPostContainsKeyWords(result.text, arrKeywords));
          if (checkBlogPostContainsKeyWords(result.text, arrKeywords).length > 0) {
            result.show = true;
          } else {
            result.show = false;
          }
        })
        // //for each key word
        // _.each(getKeywords($scope.data.keywords)) {

        // }
      }      
    }

    function getKeywords(keywords) {
      return keywords.toLowerCase().split(',');
    }



  }])
