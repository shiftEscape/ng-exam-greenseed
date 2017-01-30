(function () {
    'use strict';

    angular
        .module('angularApp', ['ui.router', 'ngMessages', 'ngStorage'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('users', {
                url: '/users/:userID',
                templateUrl: '../views/user.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('register', {
                url: '/register',
                templateUrl: '../views/registration.html',
                controller: 'RegistrationController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: '../views/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            });
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common['x-access-token'] = $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login', '/register'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            
            if (!restrictedPage && $localStorage.currentUser) {
                $location.path('/');
            }

            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();