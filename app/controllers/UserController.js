(function () {
    'use strict';

    angular
        .module('angularApp')
        .controller('UserController', UserController);

    function UserController($location, $stateParams, AuthenticationService, UserService) {
        var vm = this;

        vm.users = [];
        vm.hasError = false;
        vm.title = "Green Seed Exam - User";

        vm.logout = function() {
            AuthenticationService.logout();
            $location.path('/login');
        }

        vm.initController = function() {
            UserService.getUser($stateParams.userID, function(user) {
                if(user.length < 1) {
                    vm.hasError = true;
                    vm.error = 'Supplied User ID is invalid or already deleted. Please verify and try again.';
                } else {
                    vm.users = user.data;
                }
            });
        };

        vm.backToList = function() {
            $location.path('/');
        };

        vm.initController();
    }

})();