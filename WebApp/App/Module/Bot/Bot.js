(function() {

    "use strict";

    angular.module('Bot', [
        'ngRoute', 'Bot.ViewModel'
    ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function($stateProvider, ngRoutesCtrl) {
        $stateProvider.state('Bot', ngRoutesCtrl.BotViewCtrl);
    }])


    //Controladores   

    .controller('BotViewCtrl', ['$scope', 'BotViewModel', function($scope, BotViewModel) {
        $scope.viewmodel = new BotViewModel();
        $scope.viewmodel.init();
    }])

})();