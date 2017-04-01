(function(){

    "use strict";

    angular.module('Home',
        [
            'ngRoute', 'Home.ViewModel'
     ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function ($stateProvider, ngRoutesCtrl) {        
        $stateProvider.state('Home', ngRoutesCtrl.HomeViewCtrl);
    }])


    //Controladores   

    .controller('HomeViewCtrl', ['$scope', 'HomeViewModel', function ($scope, HomeViewModel) {
        $scope.viewmodel = new HomeViewModel();
        $scope.viewmodel.init();
    }])

})();