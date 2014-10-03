'use strict';

angular.module('groupsAgentApp').controller('AuthCtrl', function($scope, Facebook) {
  // Defining user logged status
  $scope.logged = false;

 /**
  * IntentLogin
  */
  $scope.IntentLogin = function() {
    Facebook.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        $scope.logged = true;
        $scope.me(response.authResponse.accessToken);
        $scope.myGroups();
      }
      else {
        $scope.login();
      }
    });
  };

  $scope.login = function() {
    // From now on you can use the Facebook service just as Facebook api says
    Facebook.login(function(response) {
    },{scope: ['user_groups','email']});
  };

  /**
   * Logout
   */
  $scope.logout = function() {
    Facebook.logout(function() {
      $scope.$apply(function() {
        $scope.user   = {};
        $scope.logged = false;
      });
    });
  };

  $scope.getLoginStatus = function() {
    Facebook.getLoginStatus(function(response) {
      if(response.status === 'connected') {
        $scope.loggedIn = true;
      } else {
        $scope.loggedIn = false;
      }
    });
  };
});