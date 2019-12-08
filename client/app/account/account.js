'use strict';

angular.module('playlistMaker')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        resolve: {
        	isLoggedIn: function($cookieStore, $location) {
        		/*if($cookieStore.get('token')) {
        			$location.path('/playlist')
        			return false;
        		}*/
        		return true
        	}
        }
      })
  });
