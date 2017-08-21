(function() {

    "use strict";

    angular.module('User.ViewModel', ['User.Service'])

    angular.module('User.ViewModel').factory('UserViewModel', ['ngLoadRequest', 'UserService', '$rootScope', '$sce', '$state', function(ngLoadRequest, UserService, $rootScope, $sce, $state) {

        var viewmodel = function($scope, userId) {
            var self = this;
            //### Config
            self.service = new UserService();
            self.state = $state;
            self.userId = userId;
            self.scope = $scope;
        }

        viewmodel.prototype.init = function(id) {
            var self = this;
            self.userId = id;
        }

        viewmodel.prototype.get = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.get(self.userId).then(function(result) {
                if (result.data == "") {} else {
                    self.username = result.data.username;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }       

        viewmodel.prototype.save = function(exit) {
            var self = this;            
            ngLoadRequest.startBlock();
            self.save(self.getModel()).then(function(result) {
                if (result.data == "") {
                    ngLoadRequest.showToastError("Error inesperado al guardar el usuario");
                } else {
                    if (exit) self.state.go('UserList');
                    else {
                        ngLoadRequest.showToastSuccess();
                        self.userId = result.data.id;
                    }
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });        
        };

        viewmodel.prototype.getModel = function() {
            var self = this;
            return {
                UserName: self.username,
                Password: self.password
            }
        }


        return viewmodel;
    }]);


})();