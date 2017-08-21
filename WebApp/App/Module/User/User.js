(function(){

    "use strict";

    angular.module('User',
        [
            'ngRoute', 'User.ViewModel','User.List.ViewModel'
     ])

    //Rutas

    .config(['$stateProvider', "ngRoutesCtrl", function ($stateProvider, ngRoutesCtrl) {        
        $stateProvider.state('User', ngRoutesCtrl.UserViewCtrl);
        $stateProvider.state('UserList', ngRoutesCtrl.UserListViewCtrl);
    }])


    //Controladores   

    .controller('UserViewCtrl', ['$scope', 'UserViewModel','$stateParams', function ($scope, UserViewModel,$stateParams) {
        $scope.viewmodel = new UserViewModel($scope);
        $scope.viewmodel.init($stateParams.id);
        if ($stateParams.id != undefined) {
            $scope.viewmodel.get();
        }
    }])

    .controller('UserListViewCtrl', ['$scope', 'UserListViewModel', function ($scope, UserListViewModel) {
        $scope.viewmodel = new UserListViewModel();
        $scope.viewmodel.init();
    }])


})();