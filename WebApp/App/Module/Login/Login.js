(function() {

    "use strict";

    angular.module('Login',
        [
            'ngRoute', 'Login.ViewModel'
        ])

        //Rutas

        .config(['$stateProvider', "ngRoutesCtrl", '$urlRouterProvider', function($stateProvider, ngRoutesCtrl, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider.state('Login', ngRoutesCtrl.LoginViewCtrl);
        }])


        //Controladores   

        .controller('LoginViewCtrl', ['$scope', 'LoginViewModel', function($scope, LoginViewModel) {
            $scope.viewmodel = new LoginViewModel();
            $scope.viewmodel.init();
        }])

})();