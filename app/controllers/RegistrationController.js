(function () {
    'use strict';

    angular
        .module('angularApp')
        .controller('RegistrationController', RegistrationController);

    function RegistrationController($location, UserService) {
        var vm = this;

        vm.register = function () {
            vm.loading = true;
            
            var userObject = {
                username: vm.username,
                first_name: vm.first_name,
                last_name: vm.last_name,
                email: vm.email,
                password: vm.password,
            };

            UserService.register(userObject, function (result) {
                if (result.success) {
                    $location.path('/');
                } else {
                    vm.error = result.message;
                    vm.loading = false;
                }
            });
        };
    }

})();