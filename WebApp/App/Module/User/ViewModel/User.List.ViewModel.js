(function() {

    "use strict";

    angular.module('User.List.ViewModel', ['User.Service'])

    angular.module('User.List.ViewModel').factory('UserListViewModel', ['ngLoadRequest', 'UserService', function(ngLoadRequest, UserService) {

        var viewmodel = function($scope) {
            var self = this;
            //### Config
            self.service = new UserService();
            self.users = [];
        }

        viewmodel.prototype.init = function() {
            var self = this;
            self.loadUsers();
        }

        viewmodel.prototype.loadUsers = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.getAll().then(function(result) {
                if (result.data == "") {} else {
                    self.users = result.data;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.removeUser = function(item) {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.remove(item.userId).then(function(result) {
                if (result.data == "" || result.data == false) {
                    ngLoadRequest.showToastError("No se ha podido eliminar el usuario : " + item.username);
                } else {
                    ngLoadRequest.showToastSuccess("Se ha eliminado correctamente el usuario : " + item.username);
                    var idx = self.users.indexOf(item);
                    self.users.splice(idx, 1);
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }        

        viewmodel.prototype.formatDate = function(date) {
            var self = this;
            return moment(date).format("DD/MM/YYYY");
        }

        return viewmodel;
    }]);


})();