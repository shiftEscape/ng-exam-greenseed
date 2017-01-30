(function () {
    'use strict';

    angular
        .module('angularApp')
        .controller('MainController', MainController);

    function MainController($location, AuthenticationService, UserService) {
        var vm = this;

        vm.users = [];
        vm.hasError = false;
        vm.title = "Green Seed Exam - Home";

        vm.initController = function() {
            UserService.getAllUsers(function(users) {
                if(users.length < 1) {
                    vm.hasError = true;
                    vm.error = "No registered users for now.";
                } else {
                    vm.users = users;
                }
                
            });
        };

        vm.viewUser = function(userID) {
            $location.path('/users/'+userID);
        }

        vm.logout = function() {
            AuthenticationService.logout();
            $location.path('/login');
        }

        vm.initController();
    }

})();