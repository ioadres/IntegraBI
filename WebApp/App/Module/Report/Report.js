(function(){

    "use strict";

    angular.module('Report',
        [
            'ngRoute', 'Report.ViewModel','widgetGrid'
     ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function ($stateProvider, ngRoutesCtrl) {        
        $stateProvider.state('Report', ngRoutesCtrl.ReportViewCtrl);
    }])


    //Controladores   

    .controller('ReportViewCtrl', ['$scope', 'ReportViewModel', function ($scope, ReportViewModel) {
        $scope.viewmodel = new ReportViewModel($scope);
        $scope.viewmodel.init();
    }])

})();