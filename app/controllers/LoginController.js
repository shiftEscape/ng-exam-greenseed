(function () {
    'use strict';

    angular
        .module('angularApp')
        .controller('LoginController', LoginController);

    function LoginController($location, AuthenticationService) {
        var vm = this;

        initController();

        function initController() {
            AuthenticationService.logout();
        };

        vm.login = function login() {
            vm.loading = true;
            AuthenticationService.login(vm.username, vm.password, function (result) {
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