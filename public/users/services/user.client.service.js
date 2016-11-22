'Use strict';

// Authentication service for user variables
var userModule = angular.module('user');
userModule.factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: JSON.parse($window.user)
    };

    return auth;
  }
]);
