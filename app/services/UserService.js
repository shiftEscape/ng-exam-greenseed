(function () {
    'use strict';

    angular
        .module('angularApp')
        .factory('UserService', UserService);

    function UserService($http, $localStorage) {
        var service = {};

        service.getAllUsers = getAllUsers;
        service.getUser = getUser;
        service.register = register;

        return service;

        function getAllUsers(cb) {
            $http.get('/api/users')
                .success(function (response) {
                    cb(response);
                }).error(function(error) {
                    cb(error);
                });
        }

        function getUser(userID, cb) {
            $http.get('/api/users/'+userID)
                .success(function (response) {
                    cb(response);
                }).error(function(error) {
                    cb(error);
                });
        }

        function register(userObject, cb) {
            $http.post('/api/users', userObject)
                .success(function (response) {
                    cb(response);
                }).error(function(error) {
                    cb(error);
                });
        }

    }
})();