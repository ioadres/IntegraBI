(function(){

    "use strict";

    angular.module('Report',
        [
            'ngRoute', 'Report.ViewModel','Report.List.ViewModel','Report.View.ViewModel','widgetGrid'
     ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function ($stateProvider, ngRoutesCtrl) {        
        $stateProvider.state('Report', ngRoutesCtrl.ReportViewCtrl);
        $stateProvider.state('ReportList', ngRoutesCtrl.ReportListViewCtrl);
        $stateProvider.state('ReportView', ngRoutesCtrl.ReportViewViewCtrl);
    }])


    //Controladores   

    .controller('ReportViewCtrl', ['$scope', 'ReportViewModel','$stateParams', function ($scope, ReportViewModel,$stateParams) {
        $scope.viewmodel = new ReportViewModel($scope);
        $scope.viewmodel.init($stateParams.id);
        if ($stateParams.id != undefined) {
            $scope.viewmodel.get();
        }
    }])

    .controller('ReportListViewCtrl', ['$scope', 'ReportListViewModel', function ($scope, ReportListViewModel) {
        $scope.viewmodel = new ReportListViewModel();
        $scope.viewmodel.init();
    }])

    .controller('ReportViewViewCtrl', ['$scope', 'ReportViewViewModel','$stateParams', function ($scope, ReportViewViewModel,$stateParams) {
        $scope.viewmodel = new ReportViewViewModel();
        $scope.viewmodel.init($stateParams.id);
        if ($stateParams.id != undefined) {
            $scope.viewmodel.get();
        }
    }])

})();