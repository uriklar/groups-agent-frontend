'use strict';

/**
 * @ngdoc function
 * @name groupsAgentApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the groupsAgentApp
 */
angular.module('groupsAgentApp').controller('MainCtrl',function($scope,Facebook,Requests){
 // Define user empty data :/
  $scope.keyword = '';
  $scope.formData = {};
  $scope.user = {};
  $scope.groups = [];
  $scope.formData.keywords = [];
  $scope.formData.groups = [];
  //$scope.feed = [];
  //$scope.query = "";

	$scope.$watch(
    function() {
      return Facebook.isReady();
    },
    function(newVal) {
      if (newVal) {
        $scope.facebookReady = true;
      }

    }
  );

  $scope.me = function(authToken) {
    Facebook.api('/me', function(response) {
      $scope.user = response;
      $scope.user.authToken = authToken;
    });
  };

  $scope.myGroups = function() {

    Facebook.api('/me/groups', function(response) {
      _.each(response.data,function(group) {
        Facebook.api(group.id, function(data) {
          $scope.groups.push(data);
        });
      });
    });
  };

  $scope.addKeyword = function () {
  	$scope.formData.keywords.push($scope.keyword);
    $scope.keyword = '';
  };

  $scope.addRemoveGroup = function(group) {
    var index = $scope.formData.groups.indexOf(group);
    if(index > -1) {
      $scope.formData.groups.splice(index,1);
    } else {
      $scope.formData.groups.push(group);
    }
  };

  $scope.formSubmitEnabled = function() {
    return $scope.formData.keywords.length > 0 &&
    $scope.formData.groups.length > 0
  };

  $scope.submit = function() {
    Requests.save({
      'groups': $scope.formData.groups,
      'keywords': $scope.formData.keywords,
      'user': $scope.user
    }, function(){
      $scope.requestSent = true;
    });
  };


});