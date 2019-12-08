'use strict';

angular.module('playlistMaker')
  .controller('LoginCtrl',['$scope', '$cookieStore', '$http', 'localStorageService', 'blockUI', 'Auth', '$location', 'isLoggedIn', function ($scope, $cookieStore, $http, localStorageService, blockUI, Auth, $location, isLoggedIn ) {
    
    $scope.user = {};
    $scope.error = $location.search().error;
    $location.search('error', null);

    $scope.login = function() {
    	blockUI.start('Logging in...');
      Auth.login().then(function(result) {
        window.location.href = result.url
      	blockUI.stop();
      }).catch(function(err) {
        blockUI.stop();
      })
    }  

  }]);
