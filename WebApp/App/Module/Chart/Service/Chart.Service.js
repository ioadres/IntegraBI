(function() {

    "use strict";

    angular.module('Chart.Service', []);

    angular.module('Chart.Service').factory('ChartService', ['$http', 'ngServicesCtrl', '$rootScope', function($http, ngServicesCtrl) {

        var Service = function() {
            var self = this;
            self.$http = $http;
        }

        Service.prototype.save = function(params) {
            var self = this;
            var url = ngServicesCtrl.ChartController.Add;
            return $http.post(url, params);
        };

        Service.prototype.get = function(params) {
            var self = this;
            var url = ngServicesCtrl.ChartController.Get;
            return $http.post(url, params);
        };

        Service.prototype.getUsers = function() {
            var self = this;
            var url = ngServicesCtrl.UserController.GetAll;
            return $http.post(url);
        };

        Service.prototype.getAll = function() {
            var self = this;
            var url = ngServicesCtrl.ChartController.GetAll;
            return $http.post(url);
        };

        Service.prototype.remove = function(params) {
            var self = this;
            var url = ngServicesCtrl.ChartController.Remove;
            return $http.post(url, params);
        };

        return Service;

    }]);


})();