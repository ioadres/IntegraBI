(function() {

    "use strict";

    angular.module('User.Service', []);

    angular.module('User.Service').factory('UserService', ['$http', 'ngServicesCtrl', '$rootScope', function($http, ngServicesCtrl) {

        var Service = function() {
            var self = this;
            self.$http = $http;
        }

        Service.prototype.save = function(params) {
            var self = this;
            var url = ngServicesCtrl.UserController.Add;
            return $http.post(url, params);
        };       

        Service.prototype.get = function(params) {
            var self = this;
            var url = ngServicesCtrl.UserController.Get;
            return $http.post(url, params);
        };

        Service.prototype.getAll = function() {
            var self = this;
            var url = ngServicesCtrl.UserController.GetAll;
            return $http.post(url);
        };

        Service.prototype.remove = function(params) {
            var self = this;
            var url = ngServicesCtrl.UserController.Remove;
            return $http.post(url, params);
        };

        return Service;

    }]);


})();