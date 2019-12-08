'use strict';

angular.module('playlistMaker')
    .factory('User', function User($http, $cookieStore, $q) {

        return {

            get: function() {
                var d = $q.defer();
                $http.get('/api/users/me').then(function(userResponse) {
                    d.resolve(userResponse.data);
                }).catch(function(err) {
                    d.reject(err);
                });
                return d.promise;
            },

            getArtists: function() {
                var d = $q.defer();
                $http.get('/api/users/artists').then(function(result) {
                    d.resolve(result.data.items);
                }).catch(function(err) {
                    d.reject(err);
                });
                return d.promise;
            }
        };
    });

