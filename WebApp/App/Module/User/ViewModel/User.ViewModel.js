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
            self.user = {
                rol : {}
            };
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
                    self.user = result.data;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }       

        viewmodel.prototype.save = function() {
            var self = this;     
            ngLoadRequest.startBlock();
            self.service.save(self.getModel()).then(function(result) {
                if (result.data == "") {
                    ngLoadRequest.showToastError("Error inesperado al guardar el usuario");
                } else {
                    self.state.go('UserList');
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });        
        };

        viewmodel.prototype.getModel = function() {
            var self = this;
            debugger;
            return {
                UserName: self.user.username,
                Password: self.password,
                Email : self.user.email,
                Lock : self.user.lock,
                Rol : {
                    id : self.user.rol.id
                },
                UserId : self.user.userId
            }
        }


        return viewmodel;
    }]);


})();