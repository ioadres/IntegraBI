(function(){

    "use strict";

    angular.module('Report',
        [
            'ngRoute', 'Report.ViewModel','Report.List.ViewModel','widgetGrid'
     ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function ($stateProvider, ngRoutesCtrl) {        
        $stateProvider.state('Report', ngRoutesCtrl.ReportViewCtrl);
        $stateProvider.state('ReportList', ngRoutesCtrl.ReportListViewCtrl);
    }])


    //Controladores   

    .controller('ReportViewCtrl', ['$scope', 'ReportViewModel', function ($scope, ReportViewModel) {
        $scope.viewmodel = new ReportViewModel($scope);
        $scope.viewmodel.init();
    }])

    .controller('ReportListViewCtrl', ['$scope', 'ReportListViewModel', function ($scope, ReportListViewModel) {
        $scope.viewmodel = new ReportListViewModel();
        $scope.viewmodel.init();
    }])

})();