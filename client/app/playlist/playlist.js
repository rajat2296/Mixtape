'use strict';

angular.module('playlistMaker')
  .config(function ($stateProvider) {
    $stateProvider
      .state('playlist', {
        url: '/playlist',
        templateUrl: 'app/playlist/playlist.html',
        controller: 'playlistCtrl',
        resolve:{
          currentUser:function($location, $cookieStore, User){
            try{
              var token = $location.search().access_token;
              if(token) {
                $cookieStore.put('token', token);
              }
              console.log($cookieStore.get('token'));
              if(!$cookieStore.get('token')) {
                $location.search('error', )
                $location.path('/');
                return false;
              }
              return User.get().then(function(user) {
                $location.url($location.path());
                console.log(user);
                return user;
              }).catch(function(err) {
                $location.path('/');
              })
            } catch (e) {
              console.log(e)
            }
          }  
        }
      })
  });
