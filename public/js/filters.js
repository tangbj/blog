'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('formatCategories', function () {
    return function (category) {
      var results = '';
      for(var i = 0, len = category.length; i < len; i++) {
        results += category[i] + ' ';
      }
      return results
    }
  });
