(function () {
    'use strict';

    angular
        .module('angularApp')
        .factory('AuthenticationService', AuthenticationService);

    function AuthenticationService($http, $localStorage) {
        var service = {};

        service.login = login;
        service.logout = logout;

        return service;

        function login(username, password, cb) {
            $http.post('/api/authenticate', { username: username, password: password })
                .success(function (response) {
                    $localStorage.currentUser = { username: username, token: response.token };
                    $http.defaults.headers.common['x-access-token'] = response.token;
                    cb(response);
                }).error(function(error) {
                    cb(error);
                });
        }

        function logout() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common['x-access-token'] = '';
        }
    }
})();