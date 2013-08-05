'use strict';

/* Controllers */

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
  controller('BlogCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/getAllPosts').success(function(data) {
      $scope.posts = data;

      //for each post, edits the text based on special characters (e.g. \n)
      //and stores edited text in editedText attribute; this is what is shown in the blog
      _.each($scope.posts, function(post) {
        post.editedText = formatText(post.text);
      });
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
      $http.post('api/newpost', data).success(function(val) {
        resetsFields($scope);
        $scope.showSuccessMessage = true;
      })
    }

    function resetsFields (scope) {
      scope.data = {};
    }

  }]);
