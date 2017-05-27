(function() {

    "use strict";

    angular.module('MachineLearning', [
        'ngRoute', 'MachineLearning.ViewModel'
    ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function($stateProvider, ngRoutesCtrl) {
        $stateProvider.state('MachineLearning', ngRoutesCtrl.MachineLearningViewCtrl);
    }])


    //Controladores   

    .controller('MachineLearningViewCtrl', ['$scope', 'MachineLearningViewModel', function($scope, MachineLearningViewModel) {
        $scope.viewmodel = new MachineLearningViewModel($scope);
        $scope.viewmodel.init();
    }])

})();