(function() {

    "use strict";

    angular.module('Chart', [
        'ngRoute', 'Chart.ViewModel', 'Chart.List.ViewModel'
    ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function($stateProvider, ngRoutesCtrl) {
        $stateProvider.state('Chart', ngRoutesCtrl.ChartViewCtrl);
        $stateProvider.state('ChartList', ngRoutesCtrl.ChartListViewCtrl);
    }])


    //Controladores   

    .controller('ChartViewCtrl', ['$scope', 'ChartViewModel', '$stateParams', function($scope, ChartViewModel, $stateParams) {
        $scope.viewmodel = new ChartViewModel($scope);
        $scope.viewmodel.init($stateParams.id);
        if ($stateParams.id != undefined) {
            $scope.viewmodel.get();
        } else {
            $scope.viewmodel.getUsers();
        }
    }])

    .controller('ChartListViewCtrl', ['$scope', 'ChartListViewModel', function($scope, ChartListViewModel) {
        $scope.viewmodel = new ChartListViewModel();
        $scope.viewmodel.init();
    }])


})();