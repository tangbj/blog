'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngSanitize'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/blog/:queryKey', {
      templateUrl: 'partials/blog',
      controller: 'BlogCtrl'
    }).  
    when('/blog', {
      templateUrl: 'partials/blog',
      controller: 'BlogCtrl'
    }).
    when('/projects/rss', {
      templateUrl: 'partials/rss',
      controller: 'RSSCtrl'      
    }).
    when('/projects', {
      templateUrl: 'partials/projects',
      controller: 'ProjectCtrl'
    }).
    when('/newpost', {
      templateUrl: 'partials/newpost',
      controller: 'NewPostCtrl'
    }).
    when('/editpost/:id', {
      templateUrl: 'partials/editpost',
      controller: 'EditPostCtrl'
    }).    
    otherwise({
      redirectTo: '/blog'
    });

  $locationProvider.html5Mode(true);
});
