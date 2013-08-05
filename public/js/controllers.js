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
    })

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
