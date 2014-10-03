'use strict';

/**
 * @ngdoc overview
 * @name groupsAgentApp
 * @description
 * # groupsAgentApp
 *
 * Main module of the application.
 */
angular
  .module('groupsAgentApp', [
    'facebook',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider,FacebookProvider,$httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('1459547414330035');

    var authToken = $("meta[name=\"csrf-token\"]").attr("content")
    $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken
  })
  .factory('Requests', function($resource) {
    var RequestsService = $resource('http://localhost:3000/requests/:id',{id: '@id'},{});
    return RequestsService;
  });


