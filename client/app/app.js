'use strict';

angular.module('playlistMaker', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'ngMaterial',
    'angular-growl',
    'blockUI',
    'infinite-scroll',
    'LocalStorageModule',
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider,blockUIConfig) {
   /* $urlRouterProvider
      .otherwise('/');*/

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    blockUIConfig.autoBlock = false;
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        console.log('respondse', response);
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })