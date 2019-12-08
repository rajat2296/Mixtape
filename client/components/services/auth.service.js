'use strict';

angular.module('playlistMaker')
    .factory('Auth', function Auth($location, $rootScope, $http, $cookieStore, $q, localStorageService) {

        return {

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var deferred = $q.defer();
                var self = this;
                $http.post('/auth', {
                    //subdomain: subdomain
                    //subdomain: subdomain
                }).then(function (response) {
                    deferred.resolve(response.data);
                }).catch(function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            },

            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                $cookieStore.remove('token');
                localStorageService.remove('token');
                currentUser = {};
                console.log($cookieStore.get('token'));
            },

            /**
             * Create a new user
             *
             * @param  {Object}   user     - user info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            createUser: function (user, callback) {
                var cb = callback || angular.noop;

                return User.save(user,
                    function (data) {
                        $cookieStore.put('token', data.token);
                        localStorageService.set('token',data.token);
                        currentUser = User.get();
                        return cb(user);
                    },
                    function (err) {
                        this.logout();
                        return cb(err);
                    }.bind(this)).$promise;
            },

            /**
             * Change password
             *
             * @param  {String}   oldPassword
             * @param  {String}   newPassword
             * @param  {Function} callback    - optional
             * @return {Promise}
             */
            changePassword: function (oldPassword, newPassword, callback) {
                var cb = callback || angular.noop;

                return User.changePassword({ id: currentUser._id }, {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                },function (user) {
                    return cb(user);
                },function (err) {
                    return cb(err);
                }).$promise;
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function () {
                return currentUser;
            },

            /**
             * Check if a user is logged in
             *
             * @return {Boolean}
             */
            isLoggedIn: function () {
                return currentUser.hasOwnProperty('role');
            },

            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function (cb, user) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function (user) {
                        cb(true, user);
                    }).catch(function () {
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('role')) {
                    cb(true, currentUser);
                } else {
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
             */
            isAdmin: function () {
                return currentUser.role === 'admin';
            },

            /**
             * Get auth token
             */
            getToken: function () {
                return $cookieStore.get('token');
            }
        };
    });

